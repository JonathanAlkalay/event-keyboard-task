import { makeStyles } from 'tss-react/mui';
import { CharacterSquares } from './CharacterSquares';
import { Keyboard } from './Keyboard';
import { ACTIONS } from '../hooks/useActionListeners';
import { useWordGame } from '../hooks/useWordGame';

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

export const WordGame = () => {

  const { classes } = useStyles()

  const { characters, status, actionListener, MAX_CHARS } = useWordGame()

  const handleKeyClick = (key: string) => {
    switch (key) {
      case 'backspace': {
        actionListener.emit(ACTIONS.BACKSPACE)
        break
      }
      case 'enter': {
        actionListener.emit(ACTIONS.ENTER, characters.join(''))
        break
      }
      default: {
        actionListener.emit(ACTIONS.KEY_PRESS, { key, fullWord: characters.join('') })
        break
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
