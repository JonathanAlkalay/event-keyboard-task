import { useState } from 'react';
import { useActionListeners } from './useActionListeners';

const MAX_CHARS = 5;

export const useWordGame = () => {
    
  const [characters, setCharacters] = useState<string[]>([]);
  const [status, setStatus] = useState<'default' | 'success' | 'error'>('default');

  const handleKeyPress = ({ key, fullWord }: { key: string, fullWord: string }) => {
    if (fullWord.length < MAX_CHARS) {
      setCharacters((prev) => [...prev, key]);
      setStatus('default');
    }
  };

  const handleBackspace = () => {
    setCharacters((prev) => prev.slice(0, -1));
    setStatus('default');
  };

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
  };

  const actionListener = useActionListeners({ handleKeyPress, handleBackspace, handleEnter })

  return { characters, status, actionListener, MAX_CHARS }
}
