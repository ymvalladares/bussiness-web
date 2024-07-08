import {
  HubConnectionBuilder,
  HubConnection,
  LogLevel,
} from "@microsoft/signalr";

//initialize connection
const conn = new HubConnectionBuilder()
  .withUrl("https://192.168.1.68:45455/hubs/chat")
  .withAutomaticReconnect()
  .build();

export let userActives = [];

export const CreateChatConnection = (username) => {
  try {
    //set
    conn.start();
    conn.on("UserConnected", () => {
      addUserConnectionId(username);
    });

    conn.on("OnlineUsers", (onlineUsers) => {
      //console.log(onlineUsers);
      userActives = [...userActives, onlineUsers];
    });
  } catch (error) {
    console.log(error);
  }
};

export const StopChatConnection = () => {
  try {
    conn.stop(() => {
      console.log("Connection Closed");
    });
  } catch (error) {
    console.log(error);
  }
};

const addUserConnectionId = (username) => {
  conn.invoke("AddUserConnectionId", username).catch((error) => {
    console.log(error);
  });
};
