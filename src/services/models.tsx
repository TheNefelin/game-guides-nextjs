export interface ApiResult {
  isSucces: boolean
  statusCode: number
  message: string
  data: Game[]
}

export interface Game {
  id: number
  name: string
  description: string
  imgUrl: string
  isActive: boolean
  characters: Character[]
  sources: Source[]
  backgrounds: Background[]
  guides: any
}

export interface Character{
  id: number
  name: string
  description: string
  imgUrl: string
}

export interface Source{
  id: number
  name: string
  imgUrl: string
}

export interface Background {
  id: number
  imgUrl: string
}