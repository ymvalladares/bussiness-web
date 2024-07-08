import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.request.use(function (config) {
  const token = JSON.parse(localStorage.getItem("TOKEN_KEY"));
  if (token) {
    config.headers.Authorization = `bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    if (error.message === "Network Error") {
      toast("Wow so easy!");
      //alert("Server is not running");
    }

    const { data, status, config, headers } = error.response;
    switch (status) {
      case 400:
        <Alert severity="error" title="test alert messages" />;
        break;

      case 401:
        // console.log("Unauthorized");
        // console.log(data);
        break;

      case 403:
        console.log("Unauthorized  por permisos");
        localStorage.removeItem("TOKEN_KEY");
        return (window.location.href = "/login");

      case 404:
        console.log("Url is  not-working ");
        <Alert severity="error" title="test alert messages" />;

      // return (window.location.href = "/*");

      case 500:
        console.log("Error de server");
        console.log(data);
        break;
    }
    return Promise.reject(error);
  }
);

//....... CRUD API .......

//Post: create, login
export const Pots_Request = async (url, newRecord) => {
  //console.log(newRecord);
  var query = axios.post(url, newRecord);
  return query;
};

//Get: get data
export const Get_Request = async (url) => {
  //console.log(url);
  var query = axios.get(url);
  return query;
};

//Put: update data
export const Put_Request = async (url, record) => {
  var query = axios.put(url, record);
  return query;
};

//Put: delete data
export const Delete_Request = async (url, id) => {
  var query = axios.delete(url + id);
  return query;
};

//....... Diferent service ......
export const createdProduct = (url, object, imagen) => {
  console.log(object);

  const fd = new FormData();
  fd.append("imagen", imagen, imagen.name);
  for (var key in object) {
    fd.append(`${key}`, `${object[key]}`);
  }
  console.log(fd.get("imagen"));

  var query = axios.post(url, fd);
  return query;
};

//...... Print PDF......
export const PrintOrder = (url) => {
  var query = axios.get(url, { responseType: "blob" });
  return query;
};
