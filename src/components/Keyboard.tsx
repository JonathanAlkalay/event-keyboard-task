import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(({
    keyboardContainer: {
      maxWidth: '700px',
      margin: '0 auto',
    },
    
    keyboardRow: {
      display: 'flex',
      justifyContent: 'center',
      margin: '5px 0',
    },
    
    keyboardKey: {
      margin: '0 3px',
      padding: '12px',
      minWidth: '40px',
      height: '40px',
      fontSize: '14px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      backgroundColor: '#ffffff',
      border: '1px solid #ccc',
      borderRadius: '4px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      userSelect: 'none',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'all 0.1s ease',
      
      '&:hover': {
        backgroundColor: '#e0e0e0',
      },
      
      '&:active': {
        backgroundColor: '#d0d0d0',
        transform: 'translateY(1px)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      },
    },
    
    specialKey: {
      backgroundColor: '#e0e0e0',
      minWidth: '70px',
    },
  }));
  
interface KeyboardProps {
  onKeyClick: (key: string) => void;
}

export const Keyboard = ({ onKeyClick }: KeyboardProps) => {
  const { classes } = useStyles();
  
  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace', 'enter'],
  ];

  return (
    <div className={classes.keyboardContainer}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={classes.keyboardRow}>
          {row.map((key) => (
            <button
              key={key}
              className={`${classes.keyboardKey} ${key === 'backspace' || key === 'enter' ? classes.specialKey : ''}`}
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
