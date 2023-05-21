import { gql } from "graphql-request";

const mutation = gql `
mutation addNewTransaction($id: ID!, $title: String, $description: String, $amount: Int){
    addNewTransaction(id: $id, title: $title, description: $description, amount: $amount){
      description
      amount
      id
      title
    }
  }
`

export default mutation;