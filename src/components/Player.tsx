import { useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Mesh, Vector3 } from 'three'
import { useKeyBoard } from '../hooks/useKeyBoard'

const CHARACTER_SPEED = 4
const CHARACTER_JUMP_FORCE = 2.5

export function Player() {
  const { moveBackward, moveForward, moveLeft, moveRight, jump } = useKeyBoard()

  const { camera } = useThree()
  const [ref, api] = useSphere<Mesh>(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 1, 0],
  }))

  const pos = useRef<number[]>([0, 0, 0])
  useEffect(() => {
    api.position.subscribe((p: number[]) => {
      pos.current = p
    })
  }, [api.position])

  const velocity = useRef<number[]>([0, 0, 0])
  useEffect(() => {
    api.velocity.subscribe((p: number[]) => {
      velocity.current = p
    })
  }, [api.velocity])

  useFrame(() => {
    camera.position.copy(
      new Vector3(
        pos.current[0], // x
        pos.current[1], // y
        pos.current[2] // z
      )
    )

    const direction = new Vector3()

    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    )

    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    )

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(CHARACTER_SPEED) // walk: 2, running: 5
      .applyEuler(camera.rotation)

    api.velocity.set(
      direction.x,
      velocity.current[1], // saltar
      direction.z
    )

    if (jump && Math.abs(velocity.current[1]) < 0.03) {
      api.velocity.set(
        velocity.current[0],
        CHARACTER_JUMP_FORCE,
        velocity.current[2]
      )
    }
  })

  return <mesh ref={ref} />
}
