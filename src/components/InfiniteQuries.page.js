import React from 'react'
import axios from 'axios'
import { useInfiniteQuery } from 'react-query'
import { Fragment } from 'react/cjs/react.production.min'

const fetchColors = ({ pageParam = 1 }) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

export const InfiniteQuries = () => {
    const { data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery(
        ['colors'],
        fetchColors,
        {
            getNextPageParam: (_lastpage, pages) => {
                if (pages.length < 5) {
                    return pages.length + 1
                }
                return undefined
            }
        }
    )
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>{error.message}</div>

    return (
        <>
            <div>
                {data?.pages.map((group, i) => {
                    return (
                        <Fragment key={i}>
                            {group.data.map((color) => (
                                <h2 key={color.id}>{color.id} {color.name}</h2>
                            ))}
                        </Fragment>
                    )
                })}
            </div>
            <button disabled={!hasNextPage} onClick={fetchNextPage}>Load More</button>
            <div>{isFetching && !isFetchingNextPage ? 'Fetching.....' : null}</div>
        </>
    )
}
