import { useEffect, useState } from 'react'

interface ActionsKeyboard {
  [keyof: string]: string

  KeyW: string
  KeyS: string
  KeyA: string
  KeyD: string
  Space: string
  Digit1: string
  Digit2: string
  Digit3: string
  Digit4: string
  Digit5: string
}

const ACTIONS_KEYBOARD_MAP: ActionsKeyboard = {
  KeyW: 'moveForward',
  KeyS: 'moveBackward',
  KeyA: 'moveLeft',
  KeyD: 'moveRight',
  Space: 'jump',
  Digit1: 'dirt',
  Digit2: 'grass',
  Digit3: 'glass',
  Digit4: 'wood',
  Digit5: 'log',
}

export function useKeyBoard() {
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    dirt: false,
    grass: false,
    glass: false,
    wood: false,
    log: false,
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { code } = event
      const action = ACTIONS_KEYBOARD_MAP[code]
      if (action) {
        // if (actions[action]) return
        setActions(prevActions => ({
          ...prevActions,
          [action]: true,
        }))
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      const { code } = event
      const action = ACTIONS_KEYBOARD_MAP[code]
      if (action) {
        // if (!actions[action]) return
        setActions(prevActions => ({
          ...prevActions,
          [action]: false,
        }))
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return actions
}
