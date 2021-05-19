import React, {createContext, useEffect, useState} from "react";
import axios from "axios";


export const UserContext = createContext({
  userDetails: {},
  setUserDetails: () => {},
  getUserDetails: () => {}
});

const UserContextProvider = (props) => {
  const [userDetails, setUserDetails] = useState({
    _id: "123",
    firstName: "User",
    bestResults: {
      easy: 20,
      medium: 30,
      hard: 40,
    },
    totalPlayCount: 1,
    winCount: 1,
  });

  async function getUserDetails() {
    const result = await axios.get("http://localhost:8050/users/me");
    const { firstName, _id, bestResults, totalPlayCount, winCount } =
      result.data;

    setUserDetails({
      firstName,
      _id,
      bestResults,
      totalPlayCount,
      winCount,
    });
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <UserContext.Provider
      value={{ userDetails, setUserDetails, getUserDetails }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
