import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const useStyles = makeStyles(() => ({
  formField: {
    marginBottom: "2rem",
  },
  cardGrid: {
    width: "500px",
  },
}));

function Register() {
  let history = useHistory();

  const classes = useStyles();
  const { updateToken } = useContext(AuthContext);

  const [values, setValues] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser(values);
      updateToken(response.data.token);
      history.push("/main/landing");
    } catch (e) {
      setErrorMessage(e.response?.data?.message || "Something went wrong");
    }
  };

  const createUser = async (values) => {
    return axios.post("http://localhost:8050/users", values);
  };

  return (
    <Card className={classes.cardGrid}>
      <CardContent>
        <form onSubmit={handleFormSubmit}>
          <FormHelperText error={true}>{errorMessage || " "}</FormHelperText>
          <TextField
            name="username"
            label="Username"
            value={values.username}
            onChange={handleInputValue}
            className={classes.formField}
            required
            fullWidth
          />
          <TextField
            name="email"
            label="Email"
            value={values.email}
            onChange={handleInputValue}
            className={classes.formField}
            required
            fullWidth
          />
          <TextField
            name="firstName"
            label="First name"
            value={values.firstName}
            onChange={handleInputValue}
            className={classes.formField}
            required
            fullWidth
          />
          <TextField
            name="lastName"
            label="Last name"
            value={values.lastName}
            onChange={handleInputValue}
            className={classes.formField}
            required
            fullWidth
          />
          <TextField
            name="password"
            value={values.password}
            onChange={handleInputValue}
            type="password"
            label="Password"
            className={classes.formField}
            required
            fullWidth
          />

          <Box>
            <Button color="primary" variant="contained" type="submit">
              Sign up
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}
export default Register;
