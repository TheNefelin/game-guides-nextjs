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
  guides: Guide[]
}

export interface Character {
  id: number
  name: string
  description: string
  imgUrl: string
}

export interface Source {
  id: number
  name: string
  url: string
}

export interface Background {
  id: number
  imgUrl: string
}

export interface Guide {
  id: number
  name: string
  sort: number
  adventures: Adventure[]
}

export interface Adventure {
  id: number
  description: string
  isImportant: boolean
  sort: number
  adventuresImg: AdventureImg[]
}

export interface AdventureImg {
  id: number
  imgUrl: string
  sort: number
}