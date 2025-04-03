import { useState, useEffect } from 'react';
import { MyActionListener } from '../MyActionListener';

export const ACTIONS = {
  KEY_PRESS: 'KEY_PRESS',
  BACKSPACE: 'BACKSPACE',
  ENTER: 'ENTER',
}

interface ActionHandlers {
  handleKeyPress: ({ key, fullWord }: { key: string, fullWord: string }) => void;
  handleBackspace: () => void;
  handleEnter: (wordToCheck: string) => void;
}
export const useActionListeners = (handlers: ActionHandlers) => {

  const [actionListener] = useState(new MyActionListener())
  
  useEffect(() => {
    actionListener.register(ACTIONS.KEY_PRESS, handlers.handleKeyPress)
    actionListener.register(ACTIONS.BACKSPACE, handlers.handleBackspace)
    actionListener.register(ACTIONS.ENTER, handlers.handleEnter)

    return () => {
      actionListener.removeListener(ACTIONS.KEY_PRESS)
      actionListener.removeListener(ACTIONS.BACKSPACE)
      actionListener.removeListener(ACTIONS.ENTER)
    };
  }, [actionListener, handlers])

  return actionListener
}
