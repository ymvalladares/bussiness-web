import React, { createContext, useEffect, useReducer, useState } from "react";
import { Reducer } from "./Reducer";
import { Get_Request } from "../Services/AxiosRequest";

// Initial State
let userDefault = {
  users: [],
};

// Create Context
export const Context = createContext();

// Provider Component: make a wrap al app.js
const Provedor = ({ children }) => {
  const [ft, setUser] = useState([]);

  const [state, dispatch] = useReducer(Reducer, userDefault);
  // Actions
  const removeUser = (id) => {
    dispatch({
      type: "REMOVE_USER",
      payload: id,
    });
  };

  const addUser = (user) => {
    dispatch({
      type: "ADD_USER",
      payload: user,
    });
  };

  const editUser = (user) => {
    dispatch({
      type: "EDIT_USER",
      payload: user,
    });
  };

  const searchUserInput = (email) => {
    dispatch({
      type: "SEARCH_USER_INPUT",
      payload: email,
    });
  };

  return (
    <Context.Provider
      value={{
        users: state.users,
        addUser,
        removeUser,
        editUser,
        searchUserInput,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default Provedor;
