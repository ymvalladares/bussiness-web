import React, { useEffect, useState } from "react";

import { Form, Formik } from "formik";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CssBaseline,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Alerts from "../Components/Alerts";
import { Schema_Reset_Password_Validation } from "../Components/Schema";
import { Link, useSearchParams } from "react-router-dom";
import Input_Fields from "../Components/Input_Fields";
import { Pots_Request } from "../Services/AxiosRequest";

const ResetPassword = () => {
  const [apiResponse, setApiResponse] = useState({});
  const [searchParams] = useSearchParams();

  // useEffect(() => {
  //   const activation_token = searchParams.get("token");

  //   console.log(activation_token);
  // });

  const onSubmit = async (values, actions) => {
    let object = { ...values, token: searchParams.get("token") };
    //console.log(object);
    actions.resetForm();

    Pots_Request(window.BaseUrl + "Account/ResetPassword", object)
      .then((response) => {
        console.log(response);
        setApiResponse(response);
      })
      .catch((error) => {
        console.log(error);
        setApiResponse(error.response);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      {Object.values(apiResponse).length !== 0 && (
        <Box sx={{ marginTop: "20px" }}>
          <Alerts
            severity={apiResponse.status == "200" ? "success" : "error"}
            title={
              apiResponse.status == "200"
                ? apiResponse.data.message
                : apiResponse.data
            }
          />
        </Box>
      )}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>

        <Formik
          initialValues={{
            email: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={Schema_Reset_Password_Validation}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form sx={{ mt: 3 }}>
              <Input_Fields label="Email" name="email" type="email" />
              <Input_Fields
                label="New Password"
                name="newPassword"
                type="password"
              />
              <Input_Fields
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                Reset Password
              </Button>
              <Link to={"/login"}>Login</Link>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default ResetPassword;
