# minnit-chat-bot

A NodeJS app that uses puppeteer to scrape data and create a chatbot for a minnit.chat room.

## Table of Contents
- [minnit-chat-bot](#minnit-chat-bot)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage:](#usage)
  - [Handlers](#handlers)
  - [Custom Hanlders](#custom-hanlders)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

1. Clone the repository:

```sh
git clone https://github.com/vskevakis/minnit-chat-bot.git
```

2. Install dependencies:

```sh
npm install
```

3. Create a `.env` file in the root directory and add the following:

```sh
MINNIT_CHAT_URL=https://minnit.chat/your-room-name
MINNIT_CHAT_USERNAME=your-username
MINNIT_CHAT_PASSWORD=your-password
TENOR_API_KEY=your-tenor-api-key
```

## Usage:

1. Start the bot:
```sh
npm start
```

2. Type a command starting with the forward slash character (/) in the chat to trigger the corresponding handler.

## Handlers

The following handlers are available:

- /chucknorris: Fetches a random Chuck Norris joke from an API and sends it to the chat.
- /emoji: Emojifies the last message by appending a random emoji to each word.
- /gif {search_term}: Fetches a random gif from the Tenor API based on a search term and sends it to the chat.
- /gifme: Fetches a random gif from the Tenor API based on the username of the last message sender and sends it to the chat.
- /insult: Fetches a random insult from an API and sends it to the chat.
- /iss: Fetches the current location and crew of the International Space Station (ISS) from an API and sends it to the chat.
- /joke: Fetches a random joke from an API and sends it to the chat.
- /launch {past | present | upcoming}: Fetches information about the next, previous, or current space launch from an API based on a command and sends it to the chat.
- /meme: Fetches a random meme image from an API and sends it to the chat.
- /mock: Mocks the second-to-last message in the chat by alternating the case of each character.
- /private {activate | deactivate}: Allows the bot to receive private messages and sends them to the chat when activated, or stops receiving private messages when deactivated.

For detailed documentation on each handler, please see the handlers directory.

## Custom Hanlders

To implement a custom handler, you can use the following template:

```js
async function myCustomHandler(chat_frame, puppeteerUtils, lastMessage) {
  // Your implementation code here
}

module.exports = myCustomHandler;
```

In this template, **chat_frame** is the puppeteer frame of the chat where the message will be sent, **puppeteerUtils** is an object containing utility functions to interact with the page via Puppeteer, and **lastMessage** is an object containing information about the last message in the chat, such as the username, text, and rank.

You can use any of the available utility functions from **puppeteerUtils** to interact with the page, such as **puppeteerUtils.send_message(chat_frame, message)** to send a message to the chat.

You can also use the information in **lastMessage** to make decisions or personalize the response. Note that **lastMessage** can be **null** if you don't need to use it in your implementation.

You don't need to add your custom handler to the list of available handlers in index.js manually. Index.js searches for any file with a .js extension in the handlers directory, except for index.js itself. If it finds a file with a handler function defined in it, it will add it to the list of available handlers.

For example, if you create a file called **"myhandler.js"** in the handlers directory and define a function called **"myhandler"**, you can use it as a command by typing **"/myhandler"** in the chat. Index.js will **automatically detect** the myhandler.js file and add it to the list of available handlers, so you don't need to modify index.js manually.

## Contributing

Contributions are welcome! Please see the [contributing guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the terms of the [GPL-3.0 license](LICENSE).