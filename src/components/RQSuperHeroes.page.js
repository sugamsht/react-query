import axios from "axios"
import { useQuery } from "react-query"

export const RQSuperHeroesPage = () => {
  useQuery("superHeroes", () => {
    return axios.get("http://localhost:4000/superheroes")
  })
  const { data, error, isLoading } = useQuery("superHeroes")
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
