// Insult handler
async function insult(chat_frame, puppeteerUtils, lastMessage) {
    const fetch = (await import('node-fetch')).default;
    try {
      const response = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json');
      const data = await response.json();
      await puppeteerUtils.send_message(chat_frame, data.insult);
    } catch (error) {
      console.error('Error fetching insult:', error);
      await puppeteerUtils.send_message(chat_frame, 'Error fetching insult.');
    }
  }
  module.exports = insult;