const puppeteerUtils = require('./utils/puppeteerUtils');
const handlers = require('./handlers');
require('dotenv').config();

(async () => {
  const url = process.env.MINNIT_URL;
  const username = process.env.MINNIT_USERNAME;
  const password = process.env.MINNIT_PASSWORD;

  const browser = await puppeteerUtils.generateBrowser();
  const page = await browser.newPage();
  const chat_frame = await puppeteerUtils.login(page, url, username, password);

  while (true) {
    const lastMessage = await puppeteerUtils.read_last_message(chat_frame);

    if (lastMessage !== null && lastMessage.text.startsWith("/")) {
      const command = lastMessage.text.split(" ")[0].substring(1);
      console.log("Command: " + command);
      const handler = handlers[command];

      if (handler) {
        console.log("Calling Handler: " + handler);
        await handler(chat_frame, puppeteerUtils, lastMessage);
      } else {
        console.log(`Unknown command: ${command}`);
      }
    }

    // Wait for 1 second before checking for new messages again
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  // This promise keeps the program running until you close the browser
  await new Promise(() => {});

  // Remember to close the browser when you're done
  await browser.close();
})();
