import { useEffect, useState } from 'react'
import { useStore } from '../hooks/useStore'
import { useKeyBoard } from '../hooks/useKeyBoard'
import * as images from '../images/images'

interface TextureOptions {
  [key: string]: boolean
  dirt: boolean
  grass: boolean
  glass: boolean
  wood: boolean
  log: boolean
}

export function TextureSelect() {
  const [visible, setVisible] = useState<boolean>(false)
  const [texture, setTexture] = useStore(state => [
    state.texture,
    state.setTexture,
  ])

  const { dirt, grass, glass, wood, log } = useKeyBoard()

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false)
    }, 700)

    setVisible(true)

    return () => {
      clearTimeout(visibilityTimeout)
    }
  }, [texture])

  useEffect(() => {
    const options: TextureOptions = {
      dirt,
      grass,
      glass,
      wood,
      log,
    }

    const keys = Object.keys(options)
    const [selectedTexture] = keys.filter(key => options[key])

    if (selectedTexture) {
      setTexture(selectedTexture)
    } else {
      setTexture(texture)
    }
  }, [dirt, grass, glass, wood, log])

  if (!visible) return null

  return (
    <div className="texture-selector">
      {Object.entries(images).map(([imgKey, img]) => {
        return (
          <img
            className={texture === imgKey.replace('Img', '') ? 'selected' : ''}
            key={imgKey}
            src={img}
            alt={imgKey}
          />
        )
      })}
    </div>
  )
}
