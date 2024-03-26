import { useBox } from '@react-three/cannon'
import { Mesh } from 'three'
import textures from '../images/texture'
import { ThreeEvent } from '@react-three/fiber'
import { useState } from 'react'
import { useStore } from '../hooks/useStore'

interface CubeProps {
  id: string
  position: [x: number, y: number, z: number]
  texture: string
}

export function Cube({ id, position, texture }: CubeProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [removeCube] = useStore(state => [state.removeCube])

  const [ref] = useBox<Mesh>(() => ({
    type: 'Static',
    position,
  }))

  const activeTexture = textures[`${texture}Texture`]

  const hoverCube = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    setIsHovered(true)
  }

  const unHoverCube = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    setIsHovered(false)
  }

  const handleClickCube = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()

    if (!ref.current?.position) return

    if (event.altKey) {
      removeCube(id)
    }
  }

  return (
    <mesh
      ref={ref}
      onPointerMove={hoverCube}
      onPointerOut={unHoverCube}
      onClick={handleClickCube}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial
        color={isHovered ? 'gray' : 'white'}
        map={activeTexture}
        attach="material"
      />
    </mesh>
  )
}
