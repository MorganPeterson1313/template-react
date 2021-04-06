import React, { Component } from "react";
import { gql } from "@apollo/client";
import { compose, graphql } from "react-apollo";

export class Integration extends React.Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event?.preventDefault();

    this.props.mutate({
      input: {
        products: ["transaction"],
      },
    });
  }

  render() {
    return (
      <button onclick={(event) => this.handleClick(event)}>Add Bank</button>
    );
  }
}

const Token_Mutation_Query = gql`
  mutation plaidLinkTokenCreate($input: PlaidLinkTokenCreateInput!) {
    plaidLinkTokenCreate(input: $input) {
      success
      record {
        linkToken
        expiration
      }
      # Plaid Error
      errors {
        code
        message
        type
      }
    }
  }
`;

export default graphql(Token_Mutation_Query)(Integration);
