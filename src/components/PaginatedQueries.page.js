import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'

const fetchColors = (page) => {
    return axios.get(`http://localhost:4000/colors/?_limit=2&_page=${page}`)
}

const PaginatedQueries = () => {
    const [page, setPage] = useState(1)
    const { data, isLoading, isError, error } = useQuery(
        ['colors', page],
        () => fetchColors(page),
        {
            keepPreviousData: true, //default:false keeps previous query data while fetching new data
        }
    )

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>{error.message}</div>
    }
    return (
        <div>
            {data?.data.map(color => <div key={color.id}>
                <h2>{color.id}. {color.name}</h2>
            </div>)}
            <button onClick={() => setPage(page => page - 1)} disabled={page === 1}>Prev page</button>
            <button onClick={() => setPage(page => page + 1)} disabled={page === 5}>Next page</button>
        </div>
    )

}

export default PaginatedQueries