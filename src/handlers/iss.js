async function iss(chat_frame, puppeteerUtils, lastMessage) {
    const fetch = (await import('node-fetch')).default;
    const url = 'http://api.open-notify.org/iss-now.json';
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.message === 'success') {
        const latitude = data.iss_position.latitude;
        const longitude = data.iss_position.longitude;
        const message = `The ISS is currently at ${latitude}:${longitude}`;
        await puppeteerUtils.send_message(chat_frame, message);
      } else {
        await puppeteerUtils.send_message(chat_frame, 'Error fetching ISS location.');
      }
    } catch (error) {
      console.error('Error fetching ISS location:', error);
      await puppeteerUtils.send_message(chat_frame, 'Error fetching ISS location.');
    }
  }
  
  module.exports = iss;
  