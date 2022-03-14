import axios from "axios"
import { useQuery } from "react-query"
import { useState } from "react"

const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheroes")
}

export const RQSuperHeroesPage = () => {

  // const [hero, setHero] = useState(3000)

  const onSuccess = (data) => {
    console.log("Performs side effect after data fetching", data);
    // if (data.data.length > 3) {
    //   setHero(false) //stop data refresh if data length is more than 3
    // }
  }
  const onError = (error) => console.log("Performs side effect after data fetching error", error);

  const { data, error, isLoading, isFetching, refetch } = useQuery(
    'superheroes',
    fetchSuperHeros,
    {
      // cacheTime: 5000, // 5 seconds default:5 minutes
      // staleTime: 30000, //default: 0 seconds
      // refetchOnMount: true, //default:true refetches if data is stale 'always':always refetches
      // refetchOnWindowFocus: true, //default:true refetches if window is focused
      // refetchInterval: 5000, //polling refetch data every 5 second default:false
      // refetchIntervalInBackground: true, //polling refetch data even if browser is in background default:false

      // enabled: false, //default:true disable data fetch on mount
      onSuccess, // onSuccess: onSuccess,
      onError,

      //data transformation to return only hero names
      // select: (data) => {
      //   const heroNamesOnly = data.data.map((hero) => hero.name)
      //   return heroNamesOnly
      // }
    }
  )

  console.log({ isLoading, isFetching })
  if (isLoading || isFetching) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <div>
      <h1>RQ Super Heroes</h1>
      <ul>
        {data?.data.map(hero => (
          <li key={hero.id}>
            <h2>{hero.name}</h2>
            <p>{hero.alterEgo}</p>
          </li>
        ))}

        {/* if use select to return only hero names
        {data?.map(heroName => (
          <li key={heroName}>
            <h2>{heroName}</h2>
          </li>
        ))} */}

      </ul>
      <button onClick={refetch}>Fetch superheroes</button> {/* fetches data on click */}
    </div>
  )


}