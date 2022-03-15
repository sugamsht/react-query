import React from 'react'
import { useParams } from 'react-router-dom'
import useHeroData from '../hooks/useHeroData'

export default function RQSuperHeroDetail() {
  const { heroId } = useParams()

  const { data, isLoading, error } = useHeroData(heroId)
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <div>
      <h2>{data?.data.name}</h2> <br />
      {data?.data.alterEgo}
    </div>
  )
}
