const puppeteer = require("puppeteer");
var numScreenshots = 0;

const generateBrowser = async () => {
    const browserOptions = {
        headless: false,
        defaultViewport: { width: 1280, height: 720 },
        args: ["--no-sandbox", "--disable-dev-shm-usage"],
    };

    return await puppeteer.launch(browserOptions);
};

const getScreenshot = async (page, screenshotName = "screenshot") => {
    await page.screenshot({ path: `${screenshotName}.png` });
    numScreenshots++;
};

const login = async (page, url, username, password) => {
    /* Navigate to the login page and wait for the page to load */
    await page.goto(url);
    await page.waitForSelector("#chat-iframe", { timeout: 10000 });

    /* Get the iframe and wait for the loading bar to disappear */
    const chatFrame = await page.$("#chat-iframe");
    const frame = await chatFrame.contentFrame();

    await frame.waitForFunction(
        () => {
            const loadingscreen = document.querySelector("#loadingscreen");
            const display = getComputedStyle(loadingscreen).display;
            return display === "none";
        },
        { polling: 100 }
    );

    /* Enter the guest username and click the save button */
    await frame.waitForSelector("#force-nickname", { timeout: 5000 });
    await frame.type("#force-nickname", username);
    await frame.click("#forceNicknameBtn");

    await page.waitForTimeout(500);

    /* Click the more menu button */
    await frame.waitForSelector("#moremenu", { timeout: 5000 });
    const moreMenu = await frame.$("#moremenu");
    // console.log("moreMenu:", moreMenu);
    await frame.click("#moremenu");

    /* Click the login button */
    await frame.waitForSelector(".loginBtn", { timeout: 5000 });
    const loginBtn = await frame.$(".loginBtn");
    // console.log("loginBtn:", loginBtn);
    await frame.click(".loginBtn");

    await page.waitForTimeout(500);

    /* Navigate to inner-chat-iframe that is used for the login process by minnit.chat */
    await frame.waitForSelector("#inner-chat-iframe", { timeout: 5000 });
    const loginFrame = await frame.$("#inner-chat-iframe");
    const innerFrame = await loginFrame.contentFrame();

    /* Enter the username and password and login */
    await innerFrame.waitForSelector("#usernameoremailinput", { timeout: 5000 });
    await innerFrame.type("#usernameoremailinput", username);
    await innerFrame.click("#usernamenextbutton");

    /* Make sure that the password input is visible */
    await innerFrame.waitForFunction(
        () => {
            const passwordInputInfo = document.querySelector("#passwordinputinfo");
            return passwordInputInfo && passwordInputInfo.className === "";
        },
        { timeout: 5000 }
    );

    await innerFrame.waitForSelector("#passwordinput", { timeout: 5000 });
    await innerFrame.type("#passwordinput", password);
    await innerFrame.click("#passwordnextbutton");

    // await page.waitForTimeout(2000);
    await page.reload({ waitUntil: "networkidle0" });
    await page.waitForTimeout(4000);
    const chat_frame = await page.waitForSelector("#chat-iframe", {
        timeout: 10000,
    });

    // Return the content frame of the chat_frame for further use
    return await chat_frame.contentFrame();
};

const send_message = async (frame, message) => {
    try {
        // Locate the #msgArea and find the textbox inside it
        const msgArea = await frame.$('#msgArea');
        const textbox = await msgArea.$('#textbox');
    
        // Check if the textbox was found
        if (!textbox) {
            console.error("The textbox was not found inside the #msgArea");
            return;
        }
    
        // Clear any existing text in the textbox
        await textbox.evaluate((el) => (el.innerHTML = ''));
    
        // Type the message you want to send
        await textbox.type(message);
    
        // Click the send button with the ID 'sendbtn'
        const sendBtn = await frame.$('#sendbtn');
        await sendBtn.click();
    } catch (error) {
        console.error('An error occurred while sending the message:', error);
    }
};

const read_messages = async (frame) => {
    // Define an array to store the messages
    const messages = [];
  
    // Get all the .msg elements from the chat window
    const msgElements = await frame.$$('.msg');
  
    // Iterate through the .msg elements and extract the required information
    for (const msgElement of msgElements) {
      // Extract the sender's name
    //   const msgName = await msgElement.$eval('.msgName', (el) => el.textContent);
        const msgName = await msgElement.$eval('.msgName .msgNick', (el) => el.textContent);
  
      // Extract the message text
      const msgText = await msgElement.$eval('.msgTextOnly', (el) => el.textContent);
  
      // Extract the rank
      const rankHex = await msgElement.$eval('.rankCustom circle', (el) => el.getAttribute('fill'));
  
      // Create an object with the extracted information and add it to the messages array
      messages.push({
        sender: msgName,
        text: msgText,
        rank: rankHex,
      });
    }
  
    return messages;
};

const read_last_message = async (frame) => {
    // Get all the .msg elements from the chat window
    const msgElements = await frame.$$('.msg');
  
    // If there are no messages, return null
    if (msgElements.length === 0) {
      return null;
    }
  
    // Get the last .msg element
    const lastMsgElement = msgElements[msgElements.length - 1];
  
    // Extract the sender's name
    const msgName = await lastMsgElement.$eval('.msgName .msgNick', (el) => el.textContent);
  
    // Extract the message text
    const msgText = await lastMsgElement.$eval('.msgTextOnly', (el) => el.textContent);
  
    // Extract the rank
    const rankHex = await lastMsgElement.$eval('.rankCustom circle', (el) => el.getAttribute('fill'));
  
    // Create an object with the extracted information and return it
    return {
      sender: msgName,
      text: msgText,
      rank: rankHex,
    };
  };
  

module.exports = {
    generateBrowser,
    getScreenshot,
    login,
    send_message,
    read_messages,
    read_last_message
};
