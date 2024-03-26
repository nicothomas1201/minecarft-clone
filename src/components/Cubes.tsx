import { useStore } from '../hooks/useStore'
import { Cube } from './Cube'

export function Cubes() {
  const [cubes] = useStore((state) => [state.cubes])

  return cubes.map((cube) => {
    const { id, position, texture } = cube
    return <Cube key={id} id={id} position={position} texture={texture} />
  })
}
