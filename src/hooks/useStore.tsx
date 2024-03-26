import { nanoid } from 'nanoid'
import { create } from 'zustand'

export interface Cube {
  id: string
  position: [x: number, y: number, z: number]
  texture: string
}

interface AppState {
  cubes: Cube[]
  texture: string
  addCube: (x: number, y: number, z: number) => void
  removeCube: (id: string) => void
  setTexture: (texture: string) => void
}

export const useStore = create<AppState>(set => ({
  texture: 'dirt',
  cubes: [
    {
      id: nanoid(),
      position: [1, 1, 0],
      texture: 'dirt',
    },
    {
      id: nanoid(),
      position: [1, 0, 0],
      texture: 'log',
    },
  ],
  addCube: (x: number, y: number, z: number) => {
    set(state => ({
      cubes: [
        ...state.cubes,
        {
          id: nanoid(),
          texture: state.texture,
          position: [x, y, z],
        },
      ],
    }))
  },
  removeCube: (id: string) => {
    set(state => ({
      cubes: state.cubes.filter(cube => cube.id !== id),
    }))
  },
  setTexture: (texture: string) => {
    set(() => ({ texture }))
  },
  saveWorld: () => {},
  resetWorld: () => {},
}))
