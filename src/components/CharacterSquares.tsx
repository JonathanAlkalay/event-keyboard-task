import React from 'react';
import './CharacterSquares.css';

interface CharacterSquaresProps {
  characters: string[];
  maxLength: number;
  status: 'default' | 'success' | 'error';
}

export const CharacterSquares = ({ characters, maxLength, status }: CharacterSquaresProps) => {
  // Create an array of the required length filled with empty strings if needed
  const displayChars = [...characters];
  while (displayChars.length < maxLength) {
    displayChars.push('');
  }

  return (
    <div className="character-squares-container">
      {displayChars.map((char, index) => (
        <div key={index} className={`character-square ${status}`}>
          {char}
        </div>
      ))}
    </div>
  );
};
