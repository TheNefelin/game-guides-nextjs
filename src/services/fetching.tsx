// import https from 'https';          

export default class Fetching {
  public imgurl: string
  private url: string
  // private myAgent: https.Agent
  private obj_get: any

  constructor() {
    this.url = "https://dragonra.bsite.net/api"
    this.imgurl = `${this.url}/img/games-guide?fileName=`
    // this.myAgent = new https.Agent({ rejectUnauthorized: false });

    this.obj_get = {
      method: "GET",
      // httpsAgent: this.myAgent,
      headers: {
        "Accept": "application/json"
      },
    }
  }

  private fnFetching = async (api: string, obj: any) => {
    try {
      const res = await fetch(api, obj)
  
      if (!res.ok) {
        console.log("Error Fetch en el res.OK", res)
        return []
      }
  
      const data = await res.json()
      return data
    } catch (err: any) {
      console.log("Error Fetch en el Try", err)
      return []
    }
  }

  public get_all_games_async = async () => { 
    const uri = `${this.url}/publico/gj-juego/`
    const obj = { ...this.obj_get, cache: 'no-store' }

    return await this.fnFetching(uri, obj) 
  }
}