import React, { createContext, useState , useEffect} from "react";

export const AuthContext = createContext();

export default function AuthProvider(props) {
  const [isLoggedIn , setIsLoggedIn] = useState(false)

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("isLoggedIn");

    if (storedLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const updateIsLoggedIn = (value) => {
    setIsLoggedIn(value);
    localStorage.setItem("isLoggedIn", value.toString());
  };



  let data = {
    isLoggedIn,
    updateIsLoggedIn
  };

  return (
    <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
  );
}
