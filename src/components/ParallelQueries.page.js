import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'

const fetchSuperHero = () => {
    return axios.get(`http://localhost:4000/superheroes/`);
}
const fetchSidekicks = () => {
    return axios.get(`http://localhost:4000/sidekicks/`);
}

export default function ParallelQueries() {
    const { data: heroData } = useQuery('superheroes', fetchSuperHero);
    const { data: sidekicksData } = useQuery('sidekicks', fetchSidekicks);
    console.log(heroData);
    console.log(sidekicksData);

    return (
        <>
            {heroData?.data.map(hero => {
                return (<div key={hero.id}>
                    <h2>{hero.name}</h2>
                    <p>{hero.alterEgo}</p>
                    {sidekicksData?.data.map(sidekick => {
                        if (sidekick.id === hero.id) {
                            return <p key={sidekick.id}>SideKick: {sidekick.name}</p>
                        }
                    })}
                </div>)
            })}
        </>
    )

}
