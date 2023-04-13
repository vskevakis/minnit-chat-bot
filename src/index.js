const puppeteerUtils = require('./utils/puppeteerUtils.js');

(async () => {
  const url = process.env.MINNIT_URL;
  const username = process.env.MINNIT_USERNAME;
  const password = process.env.MINNIT_PASSWORD;

  const browser = await puppeteerUtils.generateBrowser();
  const page = await browser.newPage();
  const chat_frame = await puppeteerUtils.login(page, url, username, password);

  let lastMessageCount = 0;

  setInterval(async () => {
    const lastMessage = await puppeteerUtils.read_last_message(chat_frame);

    if (lastMessage !== null) {
      switch (true) {
        case lastMessage.text.startsWith("/hey"):
          const text = lastMessage.text.substring(4).trim();
          console.log(`Received /hey message with text: ${text}`);
          await puppeteerUtils.send_message(chat_frame, 'hey you too');
          break;
        case lastMessage.text.startsWith("/command1"):
          // Handle command1
          break;
        case lastMessage.text.startsWith("/command2"):
          // Handle command2
          break;
        // Add more cases for other commands as needed
        default:
          // Handle other messages
          break;
      }
    }
  }, 500); // Check for new messages every 0.5 seconds

  // This promise keeps the program running until you close the browser
  await new Promise(() => {});

  // Remember to close the browser when you're done
  await browser.close();
})();
