import React from 'react'
import ProductionCard from './ProductionCard'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'
import '../styles/productionList.css'

const PRODUCTIONS = gql`
  query Productions($kindId: ID) {
    productions(kindId: $kindId) {
      id,
      title,
      date
      description,
      image,
      rate,
      productionKind {
        id,
        name
      }
    }
  }
`

const DELETE_PRODUCTION = gql`
  mutation deleteProduction($id: ID!) {
    deleteProduction(id: $id) {
      message
    }
  }
`

export default function ProductionsList(props) {
  const { loading, error, data, refetch } = useQuery(PRODUCTIONS,
    {
      variables: { kindId: props.production_kind || null },
      fetchPolicy: props.refresh ? 'network-only' : 'cache-first'
    }
  )

  const [deleteProduction, mutationData] = useMutation(DELETE_PRODUCTION)
  if (loading && data === undefined) return <h1>Loading2...</h1>
  if (error) return <h1>{error.message}</h1>
  if (data.productions.length === 0) return <h1>There's nothing to see unu</h1>

  function deleteProductionRecord(id) {
    return new Promise((resolve, reject) => {
      let parsedId = parseInt(id)

      if (window.confirm("Are you sure? o.o") ) {
        deleteProduction({ variables: { id: parsedId } })
        resolve()
      } else {
        reject()
      }
    })
  }

  return(
    <div className="productions-list-container">
      {data.productions.map(production => {
        return(
          <ProductionCard
            key={production.id}
            production={production}
            deleteProduction={deleteProductionRecord}
            refetchData={refetch}
          />
        )
      })}
    </div>
  )
}