import axios from "axios";
import { useQuery } from "react-query";


const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`);
}

export default function useHeroData(heroId) {
    return useQuery(
        // `superheroes/${heroId}`,
        ['superheroes', heroId],
        () => fetchSuperHero(heroId)
    )
}

// const fetchSuperHero = ({ queryKey }) => {
//     const heroId = queryKey[1];
//     return axios.get(`http://localhost:4000/superheroes/${heroId}`);
// }

// export default function useHeroData(heroId) {
//     return useQuery(
//         ['superheroes', heroId],
//         fetchSuperHero
//     )
// }
