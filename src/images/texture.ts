import { grassImg, dirtImg, logImg, glassImg, woodImg } from './images'
import { NearestFilter, RepeatWrapping, Texture, TextureLoader } from 'three'

interface GameTextures {
  [key: string]: Texture
  groundTexture: Texture
  dirtTexture: Texture
  logTexture: Texture
  glassTexture: Texture
  woodTexture: Texture
}

const groundTexture = new TextureLoader().load(grassImg)
const dirtTexture = new TextureLoader().load(dirtImg)
const logTexture = new TextureLoader().load(logImg)
const glassTexture = new TextureLoader().load(glassImg)
const woodTexture = new TextureLoader().load(woodImg)

groundTexture.wrapS = RepeatWrapping
groundTexture.wrapT = RepeatWrapping

groundTexture.magFilter = NearestFilter
dirtTexture.magFilter = NearestFilter
logTexture.magFilter = NearestFilter
glassTexture.magFilter = NearestFilter
woodTexture.magFilter = NearestFilter

const gameTextures: GameTextures = {
  groundTexture,
  dirtTexture,
  logTexture,
  glassTexture,
  woodTexture,
}

export default gameTextures
