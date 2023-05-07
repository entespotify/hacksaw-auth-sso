import { gql } from 'graphql-request'

const query = gql`
query transactions{
    transactions {
      id
      title
      description
      amount
    }
  }
  `
export default query;