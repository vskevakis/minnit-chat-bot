// Emoji handler
async function emoji(chat_frame, puppeteerUtils, lastMessage) {
    const fetch = (await import('node-fetch')).default;

    const emojiList = [
      '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋',
      '😎', '😍', '😘', '😗', '😙', '😚', '🙂', '🤗', '🤔', '😐', '😑', '😶',
      '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '😴', '😌', '😛',
      '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '🙁', '😖',
      '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰',
      '😱', '🥵', '🥶', '😳', '🤪', '😵', '😡', '😠', '🤬', '😷', '🤒', '🤕',
      '🤢', '🤮', '🤧', '😇', '🥳', '🥴', '🥺', '🤠', '🤡', '🤥', '🤫', '🤭',
      '🧐', '🤓', '😈', '👿', '👹', '👺', '💀', '☠️', '👻', '👽', '👾', '🤖',
    ];
  
    const command = lastMessage.text.split(" ")[0];
    const text = lastMessage.text.substring(command.length).trim();
    const words = text.split(" ");
    
    const getRandomEmoji = () => emojiList[Math.floor(Math.random() * emojiList.length)];
  
    const emojifiedText = words.map((word, index) => {
      if (index < words.length - 1) {
        return word + ' ' + getRandomEmoji() + ' ';
      }
      return word;
    }).join('');
  
    await puppeteerUtils.send_message(chat_frame, emojifiedText);
  }
  module.exports = emoji;
  