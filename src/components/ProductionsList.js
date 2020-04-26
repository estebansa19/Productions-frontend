import React from 'react'
import ProductionCard from './ProductionCard'
import { useQuery } from '@apollo/react-hooks'
import { PRODUCTIONS } from '../api/queries'
import Loading from './Loading'
import '../styles/productionList.css'

export default function ProductionsList(props) {
  const { loading, error, data, refetch } = useQuery(PRODUCTIONS,
    {
      variables: { kindId: props.production_kind || null },
      fetchPolicy: props.refresh ? 'network-only' : 'cache-first'
    }
  )

  if (loading && data === undefined) return <Loading />
  if (error) return <h1>{error.message}</h1>
  if (data.productions.length === 0) return <h1>There's nothing to see unu</h1>

  return(
    <div className="productions-list-container">
      {data.productions.map(production => {
        return(
          <ProductionCard
            key={production.id}
            production={production}
            refetchData={refetch}
          />
        )
      })}
    </div>
  )
}