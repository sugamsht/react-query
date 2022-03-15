import { useQuery, useMutation, useQueryClient } from "react-query"
import axios from "axios"

const fetchSuperHeros = () => {
    return axios.get("http://localhost:4000/superheroes")
}

const addSuperHero = (hero) => {
    return axios.post("http://localhost:4000/superheroes", hero) //post hero data to api
}

export const useHerosData = ({ onSuccess, onError }) => {
    return useQuery(
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
}

export const useAddSuperHeroData = () => {
    const queryClient = useQueryClient()
    return useMutation(addSuperHero, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('superheroes') //invalidate query to refetch data
        }
    })
}
