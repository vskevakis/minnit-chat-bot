async function mock(chat_frame, puppeteerUtils, None) {
    const messages = await puppeteerUtils.read_messages(chat_frame, 2);
    if (messages.length < 2) {
        await puppeteerUtils.send_message(chat_frame, "Not enough messages to mock.");
        return;
    }

    const messageToMock = messages[messages.length - 2].text;
    const mockedMessage = messageToMock
        .split("")
        .map((char, index) => (index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()))
        .join("");

    await puppeteerUtils.send_message(chat_frame, mockedMessage);
}

module.exports = mock;
