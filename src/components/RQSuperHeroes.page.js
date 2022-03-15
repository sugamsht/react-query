import { useHerosData } from "../hooks/useHerosData";

export const RQSuperHeroesPage = () => {

  // const [hero, setHero] = useState(3000)

  const onSuccess = (data) => {
    console.log("Performs side effect after data fetching", data);
    // if (data.data.length > 3) {
    //   setHero(false) //stop data refresh if data length is more than 3
    // }
  }
  const onError = (error) => console.log("Performs side effect after data fetching error", error);

  const { data, error, isLoading, isFetching, refetch } = useHerosData({ onSuccess, onError });

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
