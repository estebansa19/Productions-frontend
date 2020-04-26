import { gql } from 'apollo-boost'

export const ADD_PRODUCTION = gql`
  mutation CreateProduction($title: String!, $description: String!, $rate: Int!, $date: String!, $image: String, $productionKindId: ID!) {
    createProduction(title: $title, description: $description, rate: $rate, date: $date, image: $image, productionKindId: $productionKindId) {
      id
    }
  }
`

export const UPDATE_PRODUCTION = gql`
  mutation UpdateProduction($id: ID!, $title: String!, $description: String!, $rate: Int!, $date: String!, $image: String, $productionKindId: ID!) {
    updateProduction(id: $id, title: $title, description: $description, rate: $rate, date: $date, image: $image, productionKindId: $productionKindId) {
      errors
    }
  }
`

export const DELETE_PRODUCTION = gql`
  mutation deleteProduction($id: ID!) {
    deleteProduction(id: $id) {
      message
    }
  }
`