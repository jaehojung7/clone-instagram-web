import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../Apollo";

const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`;

// Custom hook that fetches information of logged-in user
// Also logs user out if token information is not correct
// authLink in our Apollo Client setup makes sure that every request from the client side contains a token
function useUser() {
  const tokenExists = useReactiveVar(isLoggedInVar);

  // Run ME_QUERY if login token exists in local storage
  // For more info about the skip option of the useQuery hook,
  // Read https://www.apollographql.com/docs/react/data/queries/
  const { data } = useQuery(ME_QUERY, {
    skip: !tokenExists,
  });

  // Log user out if a token exists but is not correct
  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);

  return { data };
}

export default useUser;
