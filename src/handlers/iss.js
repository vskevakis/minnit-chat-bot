async function iss(chat_frame, puppeteerUtils, lastMessage) {
    const fetch = (await import('node-fetch')).default;
    const url = 'http://api.open-notify.org/iss-now.json';
    const url2 = 'http://api.open-notify.org/astros.json';
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.message === 'success') {

        try {
          const response2 = await fetch(url2);
          const data2 = await response2.json();
          if (data2.message === 'success') {
            const message = `The ISS is currently at ${data.iss_position.latitude}:${data.iss_position.longitude} and there are ${data2.number} people on board.`;
            await puppeteerUtils.send_message(chat_frame, message);
            let message2 = '';
            data2.people.forEach(async (person) => {
              message2 += `${person.name}, `;
            });
            await puppeteerUtils.send_message(chat_frame, message2.slice(0, -1));
          } else {
            await puppeteerUtils.send_message(chat_frame, 'Error fetching ISS location.');
          }
        } catch (error) {
          console.error('Error fetching ISS Members:', error);
          // await puppeteerUtils.send_message(chat_frame, 'Error fetching ISS location.');
        }
        // const latitude = data.iss_position.latitude;
        // const longitude = data.iss_position.longitude;
        // const message = `The ISS is currently at ${latitude}:${longitude}`;
        // await puppeteerUtils.send_message(chat_frame, message);
      } else {
        await puppeteerUtils.send_message(chat_frame, 'Error fetching ISS location.');
      }
    } catch (error) {
      console.error('Error fetching ISS location:', error);
      await puppeteerUtils.send_message(chat_frame, 'Error fetching ISS location.');
    }
  }
  
  module.exports = iss;
  