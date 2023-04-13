async function gifme(chat_frame, puppeteerUtils, lastMessage) {
    const fetch = (await import('node-fetch')).default;
    const apiKey = process.env.TENOR_API_KEY;
    const username = lastMessage.username;
    const url = `https://api.tenor.com/v1/search?q=${encodeURIComponent(username)}&key=${apiKey}&limit=20`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.results && data.results.length > 0) {
        // Get a random index from the results array
        const randomIndex = Math.floor(Math.random() * data.results.length);
  
        // Get the gif URL of the random result
        const gifUrl = data.results[randomIndex].media[0].gif.url;
        await puppeteerUtils.send_message(chat_frame, gifUrl);
      } else {
        await puppeteerUtils.send_message(chat_frame, 'No gif found for your username.');
      }
    } catch (error) {
      console.error('Error fetching gif:', error);
      await puppeteerUtils.send_message(chat_frame, 'Error fetching gif.');
    }
  }
  
  module.exports = gifme;
  