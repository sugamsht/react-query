import { useAddSuperHeroData, useHerosData } from "../hooks/useHerosData";
import { Link } from "react-router-dom";
import { useState } from "react";

export const RQSuperHeroesPage = () => {

  const [name, setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')


  // const [hero, setHero] = useState(3000)

  const onSuccess = (data) => {
    console.log("Performs side effect after data fetching", data);
    // if (data.data.length > 3) {
    //   setHero(false) //stop data refresh if data length is more than 3
    // }
  }
  const onError = (error) => console.log("Performs side effect after data fetching error", error);

  const { data, error, isLoading, isFetching, refetch } = useHerosData({ onSuccess, onError });

  //mutate data(api) to add new hero
  const { mutate: addHero } = useAddSuperHeroData()
  const handleAddHeroClick = () => {
    const hero = { name, alterEgo }
    addHero(hero)
  }


  // console.log({ isLoading, isFetching })
  if (isLoading || isFetching) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>
  return (
    <div>
      <h1>RQ Super Heroes</h1>
      <div>
        <input
          type='text'
          value={name}
          placeholder='Supehero Name'
          onChange={e => setName(e.target.value)}
        />
        <input
          type='text'
          value={alterEgo}
          placeholder='Alter Ego'
          onChange={e => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>

      <ul>
        {data?.data.map(hero => (
          <li key={hero.id}>
            <Link to={`/rq-super-heros/${hero.id}`}>{hero.name}</Link>
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
