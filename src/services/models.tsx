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
  guidesUser: GuidesUser[]
}

export interface GuidesUser {
  id_Guide: number
  id_User: string
  isCheck: boolean
}

export interface Adventure {
  id: number
  description: string
  isImportant: boolean
  sort: number
  adventuresImg: AdventureImg[]
  adventuresUser: AdventuresUser[]
}

export interface AdventuresUser {
  id_Adventure: number
  id_User: string
  isCheck: boolean
}

export interface AdventureImg {
  id: number
  imgUrl: string
  sort: number
}

export interface GoogleBody {
  email: string,
  sub: string,
  jti: string
}