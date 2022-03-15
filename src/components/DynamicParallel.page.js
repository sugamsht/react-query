import React from 'react'
import axios from 'axios'
import { useQueries } from 'react-query'


//heroId is dynamic(changing)
const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`);
}

export default function DynamicParallel({ heroIds }) {
    const queryResults = useQueries(
        heroIds.map(heroId => {
            return {
                queryKey: ['superheroes', heroId],
                queryFn: () => fetchSuperHero(heroId)
            }
        }),
    )
    console.log(queryResults);
    return (
        <div>DynamicParallel</div>
    )
}
