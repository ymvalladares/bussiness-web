let arrayPrueba = [];

export const Reducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "REMOVE_USER":
      console.log(state);
      console.log(action);
      return {
        users: state.users.filter((user) => {
          return user.id !== action.payload;
        }),
        reducerUsers: state.reducerUsers,
      };
    case "SEARCH_USER_INPUT":
      // console.log(state);
      // console.log(action);
      if (action.payload === "") {
        return {
          users: state.reducerUsers,
          reducerUsers: state.reducerUsers,
        };
      } else {
        return {
          users: state.users.filter((user) => {
            return user.email === action.payload;
          }),
          reducerUsers: state.reducerUsers,
        };
      }

    case "ADD_USER":
      console.log(state);
      console.log(action);

      return {
        users: [...state.users, action.payload],
        reducerUsers: state.reducerUsers,
      };

    case "EDIT_USER":
      console.log(action);
      const updateUser = action.payload;

      const updateUsers = state.users.map((user) => {
        if (user.id === updateUser.id) {
          return {
            id: updateUser.id,
            name: updateUser.name,
            lastName: updateUser.lastName,
            email: updateUser.email,
            age: updateUser.age,
            amountDonate: updateUser.amountDonate + user.amountDonate,
          };
        }
        return user;
      });
      return {
        users: updateUsers,
      };

    default:
      return state;
  }
};
