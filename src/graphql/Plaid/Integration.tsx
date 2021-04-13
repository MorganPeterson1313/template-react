import React, { Component, useState } from "react";
import { gql } from "@apollo/client";
import { graphql } from "react-apollo";
import Button from "react-bootstrap/Button";
import { ReadableOptions } from "stream";
import useQuilttClient from "../../graphql/client";
import { Children } from "react";

type Props = {
  api: React.ReactNode;
};

export class Integration extends React.Component<Props, {}> {
  constructor(props: {
    api: undefined;
    data: object;
    props: undefined;
    DataProps: undefined;
    MutateProps: undefined;
  }) {
    super(props);
    this.state = {
      plaid: [],
    };
  }

  componentDidMount() {
    // const api = useQuilttClient(session);

   
   {this.props.api}.query({ query: Plaid_Item_Query })
      .then((result) => {
        this.setState(() => ({ plaid: result.data }));
        console.log(this.state.plaid);
      })
      .catch((error) => {
        console.error("Server Error", error);
      });
  }

  clickHandler = () => {
    console.log(this.props);
    // this.props.mutate({
    //   input: {
    //     products: ["transaction"],
    //   },
    // });
  };

  render() {
    console.log("in component", this.props);
    return (
      <div>
        <Button
          id="filter-submit-btn"
          onClick={this.clickHandler.bind(this)}
          type="button"
          variant="light"
          style={{ fontSize: "30px" }}
        >
          +
        </Button>
      </div>
    );
  }
}

// const api = useQuilttClient(session);

const Plaid_Item_Query = gql`
  query PlaidItemsQuery {
    plaidItems {
      id
      name
      status
      syncedAt
      logo {
        url
      }
    }
  }
`;

const Plaid_Token_Mutation_Query = gql`
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

export default graphql(Plaid_Token_Mutation_Query)(Integration);
