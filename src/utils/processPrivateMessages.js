let processPrivateMessagesActive = false;

async function processPrivateMessages(chat_frame, puppeteerUtils) {
    while (true) {
        try {
            const chatDms = await chat_frame.$('#chat-dms');
            const convoBoxes = await chatDms.$$('.convoBox');

            for (let i = 0; i < convoBoxes.length; i++) {
                const convoBox = convoBoxes[i];

                const lastMsgText = await convoBox.$eval('.convoText .lastMsgText', el => el.innerText);
                // console.log("New private message: " + lastMsgText)
                if (processPrivateMessagesActive) {
                    await puppeteerUtils.send_message(chat_frame, "Private Message: " + lastMsgText);
                }

                // Click the deleteConvo div to close the private message
                const deleteConvo = await convoBox.$('.deleteConvo');
                await deleteConvo.click();

                // Wait for a short interval before processing the next message
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        } catch (error) {
            console.error('Error processing private messages:', error);
        }

        // Wait for a short interval before checking again
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}


module.exports = {
    processPrivateMessages,
    activate: () => {
      processPrivateMessagesActive = true;
    },
    deactivate: () => {
      processPrivateMessagesActive = false;
    },
  };