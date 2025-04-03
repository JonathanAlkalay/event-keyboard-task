import './Keyboard.css';

interface KeyboardProps {
  onKeyClick: (key: string) => void;
}
export const Keyboard = ({ onKeyClick }: KeyboardProps) => {
  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace', 'enter'],
  ];

  return (
    <div className="keyboard-container">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              className={`keyboard-key ${key === 'backspace' || key === 'enter' ? 'special-key' : ''}`}
              onClick={() => onKeyClick(key)}
            >
              {key === 'backspace' ? '⌫' : key === 'enter' ? '↵' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
