import React, { createContext} from "react";

export const UserContext = createContext();

export default function AuthProvider(props) {

  let data = {

  };

  return (
    <UserContext.Provider value={data}>{props.children}</UserContext.Provider>
  );
}
