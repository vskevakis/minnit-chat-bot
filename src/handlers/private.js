// handlers/private.js
const { activate, deactivate } = require('../utils/processPrivateMessages');

async function privateHandler(chat_frame, puppeteerUtils, message) {
  const command = message.text.trim().split(" ")[1];

  if (command === "activate") {
    activate();
    await puppeteerUtils.send_message(chat_frame, "Private messages activated. PM me to send a private message to the chat.");
  } else if (command === "deactivate") {
    deactivate();
    await puppeteerUtils.send_message(chat_frame, "Private messages deactivated.");
  } else {
    await puppeteerUtils.send_message(chat_frame, "Unknown command for /private. Use /private activate or /private deactivate.");
  }
}

module.exports = privateHandler;
