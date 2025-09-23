export interface ApiResult<T> {
  isSuccess: boolean
  statusCode: number
  message: string
  data: T
}

export interface Game {
  game_Id: number
  name: string
  description: string
  imgUrl: string
  isEnabled: boolean
  characters: Character[]
  sources: Source[]
  backgroundImgs: BackgroundImg[]
  guides: Guide[]
}

export interface Character {
  character_Id: number
  name: string
  description: string
  imgUrl: string
}

export interface Source {
  source_Id: number
  name: string
  url: string
}

export interface BackgroundImg {
  backgroundImg_Id: number
  imgUrl: string
}

export interface Guide {
  guide_Id: number
  name: string
  sort: number
  adventures: Adventure[]
  guideUser: GuideUser
}

export interface GuideUser {
  user_id: string
  guide_Id: number
  isCheck: boolean
}

export interface NewUserGuide {
  guide_Id: number
  isCheck: boolean
  userToken: LoggedGoogleToken
}

export interface Adventure {
  adventure_Id: number
  description: string
  isImportant: boolean
  sort: number
  adventureImg: AdventureImg[]
  adventureUser: AdventureUser
}

export interface AdventureUser {
  user_Id: string
  adventure_Id: number
  isCheck: boolean
}

export interface NewUserAdventure {
  adventure_Id: number
  isCheck: boolean
  userToken: LoggedGoogleToken  
}

export interface AdventureImg {
  adventureImg_Id: number
  imgUrl: string
  sort: number
}

export interface GoogleBody {
  email: string,
  googleSUB: string,
  googleJTI: string
}

export interface LoggedGoogleToken {
  user_Id: string,
  sqlToken: string
}
