import axios from "axios"
import { useQuery } from "react-query"

const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheroes")
}

export const RQSuperHeroesPage = () => {

  const { data, error, isLoading, isFetching } = useQuery(
    'superheroes',
    fetchSuperHeros,
    {
      // cacheTime: 5000, // 5 seconds default:5 minutes
      // staleTime: 30000, //default: 0 seconds
      // refetchOnMount: true, //default:true refetches if data is stale 'always':always refetches
      // refetchOnWindowFocus: true, //default:true refetches if window is focused
      refetchInterval: 10000, //polling refetch data default:false
      // refetchIntervalInBackground: true, //polling refetch data even if browser is in background default:false
    }
  )

  console.log({ isLoading, isFetching })
  if (isLoading) return <div>Loading...</div>
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
      </ul>
    </div>
  )


}
