import axios from "axios";
import { useQuery, useQueryClient } from "react-query";


const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`);
}

export default function useHeroData(heroId) {
    const queryClient = useQueryClient()
    return useQuery(
        // `superheroes/${heroId}`,
        ['superheroes', heroId],
        () => fetchSuperHero(heroId),
        {
            //check cached data and show it if exists then fetch in background (doesn't show loading)
            initialData: () => {
                const hero = queryClient.getQueryData('superheroes')?.data?.find(hero => hero.id === parseInt(heroId))
                if (hero) {
                    return {
                        data: hero
                    }
                }
                return undefined
            }
        }
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
