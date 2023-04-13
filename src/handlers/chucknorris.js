// Chuck Norris handler
async function chucknorris(chat_frame, puppeteerUtils, lastMessage) {
    const fetch = (await import('node-fetch')).default;
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/random');
      const data = await response.json();
      await puppeteerUtils.send_message(chat_frame, data.value);
    } catch (error) {
      console.error('Error fetching Chuck Norris joke:', error);
      await puppeteerUtils.send_message(chat_frame, 'Error fetching Chuck Norris joke.');
    }
  }
  module.exports = chucknorris;