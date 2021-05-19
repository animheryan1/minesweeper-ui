import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import styles from "../assets/jss/landing";
import { UserContext } from "../contexts/UserContext";
import Container from "@material-ui/core/Container";
import { AuthContext } from "../contexts/AuthContext";
import { Redirect, Route, Switch } from "react-router-dom";
import Landing from "../views/Landing";
import Game from "../views/Game";
import Dashboard from "../views/Dashboard";
const useStyles = makeStyles(styles);

function Main() {
  const classes = useStyles();
  const { userDetails } = useContext(UserContext);
  const { updateToken } = useContext(AuthContext);

  function logout() {
    updateToken("");
  }

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <SportsEsportsIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" className={classes.title}>
            Welcome {userDetails.firstName}
          </Typography>
          <Button
            variant="outlined"
            className={classes.button}
            endIcon={<ExitToAppIcon />}
            onClick={logout}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Switch>
            <Route exact path="/main/landing" component={Landing} />
            <Route exact path="/main/game/:difficulty" component={Game} />
            <Route exact path="/main/dashboard" component={Dashboard} />
            <Redirect from="/main" to="/main/landing" />
          </Switch>
        </Container>
      </main>
    </>
  );
}

export default Main;
