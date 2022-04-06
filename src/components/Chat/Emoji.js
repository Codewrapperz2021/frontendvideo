import React, { useState } from 'react';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';

const Emoji = ( ) => {
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
    }
    return (     
        <div>
            <Picker onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK}/>
            { chosenEmoji && <EmojiData chosenEmoji={chosenEmoji}/>}
        </div>
    );
};
const EmojiData = ({chosenEmoji}) => (
  <div>
    <br></br>
     {chosenEmoji.emoji}
     {console.log(chosenEmoji.emoji)}
  </div>
);
export default Emoji;
