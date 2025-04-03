import { makeStyles } from 'tss-react/mui';


const useStyles = makeStyles()(({
    characterSquaresContainer: {
      display: 'flex',
      justifyContent: 'center',
      margin: '2rem 0',
    },
  
    characterSquare: {
      width: 60,
      height: 60,
      border: '2px solid #ccc',
      margin: '0 5px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '2rem',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
  
    success: {
      borderColor: 'green',
    },
  
    error: {
      borderColor: 'red',
    },
  }))
  
interface CharacterSquaresProps {
  characters: string[];
  maxLength: number;
  status: 'default' | 'success' | 'error';
}
export const CharacterSquares = ({ characters, maxLength, status }: CharacterSquaresProps) => {
  
    const { classes } = useStyles();

    const displayChars = [...characters];
    while (displayChars.length < maxLength) {
        displayChars.push('');
    }

    return (
        <div className={classes.characterSquaresContainer}>
        {displayChars.map((char, index) => (
            <div 
            key={index} 
            className={`${classes.characterSquare} ${status === 'success' ? classes.success : status === 'error' ? classes.error : ''}`}
            >
            {char}
            </div>
        ))}
        </div>
    );
};
