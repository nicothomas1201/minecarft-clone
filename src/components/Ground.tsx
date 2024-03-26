import { usePlane } from '@react-three/cannon'
import { Mesh } from 'three'
import gameTextures from '../images/texture'
import { useStore } from '../hooks/useStore'
import { ThreeEvent } from '@react-three/fiber'
// import

export function Ground() {
  const [ref] = usePlane<Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0], // x, y, z
    position: [0, -0.5, 0],
  }))

  const [addCube] = useStore(state => [state.addCube])

  const { groundTexture } = gameTextures

  groundTexture.repeat.set(100, 100)

  const handleClickDown = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    const [x, y, z] = Object.values(event.point).map((position: number) =>
      Math.ceil(position)
    )
    addCube(x, y, z)
  }

  return (
    <mesh onClick={handleClickDown} ref={ref}>
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  )
}
