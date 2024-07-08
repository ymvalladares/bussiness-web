import React, { useState } from "react";
import useLocalStorage from "use-local-storage";
import { Form, Formik } from "formik";
import { Schema_Login_Validation } from "../Components/Schema";
import Input_Fields from "../Components/Input_Fields";
import CustomCheckbox from "../Components/CustomCheckbox";
import { Pots_Request, JoinChatRoom } from "../Services/AxiosRequest";
import Button from "@mui/material/Button";

//react router dom
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";
import Alerts from "../Components/Alerts";
import { Box, Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import AppleIcon from "@mui/icons-material/Apple";

const form_inputs = [
  {
    name: "email",
    label: "E-mail",
    type: "email",
    placeholder: "Enter your email",
    action: ["login", "register", "forgetPassword"],
  },
  {
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "Enter your username",
    action: ["register"],
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    action: ["login", "register"],
  },
];

const Login = () => {
  const [user_action, set_User_Action] = useState("login");
  const [print_Alert, set_Print_Alert] = useState({
    message: "",
    severity: "",
  });
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const Navigate = useNavigate();

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const onSubmit = async (values, actions) => {
    //console.log(values.email);
    // console.log(actions);
    // Pots_Request(window.BaseUrlGeneral + `Account/${user_action}`, values)
    //   .then((response) => {
    //     //console.log(response);
    //     if (response.status == "200" && user_action == "login") {
    //       localStorage.setItem(
    //         "TOKEN_KEY",
    //         JSON.stringify(response.data.message)
    //       );
    //       actions.resetForm();
    //       return Navigate("/home-page", {
    //         state: { email: values.email },
    //       });
    //     } else if (response.status == "200" && user_action == "register") {
    //       actions.resetForm();
    //       set_Print_Alert({
    //         message: "User Created Succesfully",
    //         severity: "success",
    //       });
    //     } else {
    //       actions.resetForm();
    //       set_Print_Alert({
    //         message: "An Email has been send to you",
    //         severity: "success",
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     set_Print_Alert({
    //       message: error.response.data,
    //       severity: "error",
    //     });
    //   });

    localStorage.setItem("TOKEN_KEY", JSON.stringify("Hello"));
    return Navigate("/home-page/welcome");
    //await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  let input_to_use = [];
  function filterInputs() {
    form_inputs.forEach((element) => {
      if (element.action.includes(user_action)) {
        input_to_use.push(element);
      }
    });
  }
  filterInputs();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
      sx={{
        fontSize: "0.8rem",
      }}
      //data-theme={theme}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2.5rem",
          boxShadow: "0px 0px 15px blue",
          width: "310px",
          borderRadius: "8px",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Stack alignItems="center" justifyContent="center">
            <Typography
              color="secondary.main"
              gutterBottom
              variant="h5"
              fontWeight="bold"
            >
              {user_action == "login" ? "Hi, Welcome Back" : "Sign up"}
            </Typography>
            <Typography
              variant="caption"
              fontSize="16px"
              textAlign={{ xs: "center", md: "inherit" }}
            >
              Enter your credentials to continue
            </Typography>
          </Stack>
          <Button
            disableElevation
            fullWidth
            //onClick={googleHandler}
            size="medium"
            variant="outlined"
            sx={{
              color: "grey.700",
              backgroundColor: "white",
              borderColor: "grey",
              marginTop: "8px",
              textTransform: "none",
            }}
          >
            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
              <GoogleIcon
                style={{
                  marginRight: 16,
                  fontSize: "18px",
                  marginTop: "5px",
                  color: "red",
                }}
              />
            </Box>
            {user_action == "login"
              ? "Sign in with Google"
              : "Sign up with Google"}
          </Button>
        </Box>

        <Box sx={{ width: "100%", marginBottom: "25px", marginTop: "25px" }}>
          <Divider>
            <Chip
              label="OR"
              variant="outlined"
              sx={{ color: "blue", padding: "0 20px" }}
            />
          </Divider>
        </Box>

        {/* ............. Alert Display ............. */}
        {print_Alert.message.length > 0 && (
          <Alerts severity={print_Alert.severity} title={print_Alert.message} />
        )}

        {/* ............. Form Display ............. */}
        <Formik
          initialValues={{
            email: "",
            password: "",
            username: "",
          }}
          validationSchema={Schema_Login_Validation}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {input_to_use.map(({ name, type, label, placeholder }) => (
                <Input_Fields
                  key={name}
                  label={label}
                  name={name}
                  type={type}
                />
              ))}

              {user_action == "login" && (
                <CustomCheckbox type="checkbox" name="remember_me" />
              )}

              {/* ............. Button_Submit Display ............. */}
              <Button
                variant="contained"
                size="small"
                disabled={isSubmitting}
                sx={{
                  backgroundColor: "#8e05c2 !important",
                  border: "1px solid #8e05c2",
                  color: "#fff",
                  margin: "16px 0",
                  padding: "7px",
                  borderRadius: "6px",
                  fontWeight: "600",
                  cursor: "pointer",
                  textTransform: "none",
                }}
                type="submit"
              >
                {user_action == "login"
                  ? "Log In"
                  : user_action == "register"
                  ? "Create"
                  : "Send Email"}
              </Button>
            </Form>
          )}
        </Formik>

        {user_action == "login" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="caption" fontWeight="bold">
              Forget your password?
            </Typography>
            <Link
              style={{
                cursor: "pointer",
                color: "#8e05c2",
                fontWeight: "bold",
              }}
              onClick={() => {
                set_User_Action("forgetPassword");
                set_Print_Alert({ message: "" });
              }}
            >
              Reset Password
            </Link>
          </Box>
        )}
        <Box sx={{ width: "100%", marginBottom: "25px", marginTop: "25px" }}>
          <Divider />
        </Box>

        {user_action == "login" && (
          <Typography
            //component={Link}
            onClick={() => {
              set_Print_Alert({ message: "" });
              set_User_Action("register");
            }}
            variant="caption"
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Don&apos;t have an account?
          </Typography>
        )}
        {user_action !== "login" && (
          <Typography
            //component={Link}
            onClick={() => {
              set_Print_Alert({ message: "" });
              set_User_Action("login");
            }}
            variant="caption"
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Already have an account?
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Login;
