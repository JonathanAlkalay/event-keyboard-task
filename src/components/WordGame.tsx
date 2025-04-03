import { useState, useEffect } from 'react';
import { MyActionListener } from '../MyActionListener';
import { CharacterSquares } from './CharacterSquares';
import { Keyboard } from './Keyboard';
import './WordGame.css';

// Define the action types
const ACTIONS = {
  KEY_PRESS: 'KEY_PRESS',
  BACKSPACE: 'BACKSPACE',
  ENTER: 'ENTER',
};

const MAX_CHARS = 5;

export const WordGame = () => {
  const [characters, setCharacters] = useState<string[]>([]);
  const [status, setStatus] = useState<'default' | 'success' | 'error'>('default');
  const [actionListener] = useState(new MyActionListener());

  useEffect(() => {
    actionListener.register(ACTIONS.KEY_PRESS, handleKeyPress);
    actionListener.register(ACTIONS.BACKSPACE, handleBackspace);
    actionListener.register(ACTIONS.ENTER, handleEnter);

    return () => {
      actionListener.removeListener(ACTIONS.KEY_PRESS);
      actionListener.removeListener(ACTIONS.BACKSPACE);
      actionListener.removeListener(ACTIONS.ENTER);
    };
  }, [actionListener])

  const handleKeyPress = ({ key, fullWord }: { key: string, fullWord: string }) => {
    if (fullWord.length < MAX_CHARS) {
      setCharacters((prev) => [...prev, key])
      setStatus('default')
    }
  }

  const handleBackspace = () => {
      setCharacters((prev) => prev.slice(0, -1))
      setStatus('default')
  }

  const handleEnter = async (wordToCheck: string) => {
    if (wordToCheck.length === MAX_CHARS) {
      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToCheck}`);
        if (response.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
      }
    }
  }

    const handleKeyClick = (key: string) => {
        switch (key) {
            case 'backspace': {
                actionListener.emit(ACTIONS.BACKSPACE);
                break;
            }
            case 'enter': {
                actionListener.emit(ACTIONS.ENTER, characters.join(''));
                break;
            }
            default: {
                actionListener.emit(ACTIONS.KEY_PRESS, { key, fullWord: characters.join('') });
                break;
            }
        }
    };

  return (
    <div className="word-game-container">
      <CharacterSquares characters={characters} maxLength={MAX_CHARS} status={status} />
      <Keyboard onKeyClick={handleKeyClick} />
    </div>
  )
}
