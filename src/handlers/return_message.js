async function return_message(chat_frame, puppeteerUtils, message) {
    const text = message.text.substring("/return_message".length).trim();
    await puppeteerUtils.send_message(chat_frame, text);
  }
  
  module.exports = return_message;
  