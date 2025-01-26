import { ApiResult } from "./models"
import Singleton from "./singleton"
// import { getApiResultAsync } from "./fetching"

export default async function DataContainer({ 
  children 
}: { 
  children: (apiResult: ApiResult) => React.ReactNode 
}) {
  // Fetch data on the server
  
  const apiResult = await Singleton.getApiResultAsync()
  // const apiResult = await getApiResultAsync()

  // Pass fetched data to children
  return (
    <div>
      {children(apiResult)}
    </div>
  )
}