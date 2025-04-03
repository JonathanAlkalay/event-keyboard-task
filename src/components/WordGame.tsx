import { useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { CharacterSquares } from './CharacterSquares';
import { Keyboard } from './Keyboard';
import { useActionListeners, ACTIONS } from '../hooks/useActionListeners';

const useStyles = makeStyles()(({
  wordGameContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    gap: '20px'
  }
}))

const MAX_CHARS = 5;

export const WordGame = () => {
  const { classes } = useStyles();
  const [characters, setCharacters] = useState<string[]>([]);
  const [status, setStatus] = useState<'default' | 'success' | 'error'>('default');
  
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
  
  const actionListener = useActionListeners({ handleKeyPress, handleBackspace, handleEnter })

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
    <div className={classes.wordGameContainer}>
      <CharacterSquares characters={characters} maxLength={MAX_CHARS} status={status} />
      <Keyboard onKeyClick={handleKeyClick} />
    </div>
  )
}
