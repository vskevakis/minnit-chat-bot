// Import required libraries

// Joke handler
async function joke(chat_frame, puppeteerUtils, lastMessage) {
    const fetch = (await import('node-fetch')).default;
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any');
    const data = await response.json();
    const joke = data.setup ? `${data.setup} ${data.delivery}` : data.joke;
    await puppeteerUtils.send_message(chat_frame, joke);
  } catch (error) {
    console.error('Error fetching joke:', error);
    await puppeteerUtils.send_message(chat_frame, 'Error fetching joke.');
  }
}

module.exports = joke;