import React, { useState, useEffect } from "react";
import { RouteComponentProps, Link } from "@reach/router";

import { gql } from "@apollo/client";
import useQuilttClient from "../../graphql/client";
import { graphql } from "react-apollo";

import { Integration } from "../../graphql/Plaid/Integration";
import { render } from "@testing-library/react";

export type ProfileProps = RouteComponentProps & {};

export const Profile: React.VFC<ProfileProps> = () => {
  const [session, setSession] = React.useState(
    localStorage.getItem("QUILTT_TOKEN")
  );

  const handleLogout = () => {
    setSession(null);
  };

  //Plaid

  // const plaidLinkHandler = (event: { preventDefault: () => void; }) =>{
  //   event.preventDefault();
  // this.props.mutate({

  //   input: {

  //       metadata: {{plaidLinkOnSuccessMetadata}},

  //       // the `public_token` string from Plaid Link's onSuccess call
  //       publicToken: "{{plaidLinkOnSuccessPublicToken}}" ,
  //   },
  // });

  // }

  if (session) {
    return <LogoutButton session={session} onClick={handleLogout} />;
  } else {
    return (
      <Link
        to="/auth"
        type="button"
        className="mt-5 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign in
      </Link>
    );
  }
};

export type LogoutButtonProps = RouteComponentProps & {
  session: string;
  onClick?: () => void;
};

export const LogoutButton: React.VFC<LogoutButtonProps> = ({
  session,
  onClick,
}) => {
  const api = useQuilttClient(session);

  api.query({ query: PROFILE_QUERY }).then((result) => console.log(result));

  //Plaid

  api.query({ query: Plaid_Item_Query }).then((result) => console.log(result));

  const handleClick = () => {
    localStorage.removeItem("QUILTT_TOKEN");

    if (onClick) onClick();
  };

  return (
    <div>
      <button
        onClick={handleClick}
        type="button"
        className="mt-5 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign out
      </button>

      <Integration api={api} />
    </div>
  );
};

const PROFILE_QUERY = gql`
  query {
    profile {
      id
      email
    }
  }
`;

//Plaid

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

// const Create_Plaid_Item_Query = gql`
//   mutation PlaidItemCreate($input: PlaidItemCreateInput!) {
//     plaidItemCreate(input: $input) {
//       success
//       record {
//         id
//         name
//         accounts {
//           id
//           name
//         }
//       }
//       errors {
//         code
//         message
//         type
//       }
//     }
//   }
// `;

// const Accounts_Payload_Query = gql`
//   query AccountsPayload {
//     accounts {
//       id
//       name
//       type
//       balance {
//         current
//         available
//         limit
//       }
//       lastFourDigits
//       status
//     }
//   }
// `;

//Plaid

export default Profile;
