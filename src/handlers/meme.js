// Meme handler
async function meme(chat_frame, puppeteerUtils, lastMessage) {
    const fetch = (await import('node-fetch')).default;
    try {
      const response = await fetch('https://api.imgflip.com/get_memes');
      const data = await response.json();
      const randomMeme = data.data.memes[Math.floor(Math.random() * data.data.memes.length)];
      await puppeteerUtils.send_message(chat_frame, randomMeme.url);
    } catch (error) {
      console.error('Error fetching meme:', error);
      await puppeteerUtils.send_message(chat_frame, 'Error fetching meme.');
    }
  }
  module.exports = meme;