import { gql } from 'apollo-boost'

export const PRODUCTION_KINDS = gql`
  {
    productionKinds {
      id,
      name
    }
  }
`

export const PRODUCTION_AND_KINDS = gql`
  query GetProduction($id: ID!) {
    production(id: $id) {
      id,
      title,
      description,
      date,
      image,
      rate,
      productionKind {
        id,
        name
      }
    },
    productionKinds {
      id,
      name
    }
  }
`

export const PRODUCTIONS = gql`
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