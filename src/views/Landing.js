import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import CardActionArea from "@material-ui/core/CardActionArea";

import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import styles from "../assets/jss/landing";
import Box from "@material-ui/core/Box";
import formatTime, { boardSizes } from "../utils/helpers";
const useStyles = makeStyles(styles);

function Landing() {
  const classes = useStyles();

  const { userDetails } = useContext(UserContext);
  const difficultyLevels = Object.keys(boardSizes);

  function getDifficultyCards() {
    return difficultyLevels.map((difficulty, i) => {
      return (
        <Grid key={i} item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardActionArea>
              <Link to={`/main/game/${difficulty}`}>
                <CardMedia
                  className={classes.cardMedia + " " + classes[difficulty]}
                  component={Box}
                />
                <CardContent className={classes.cardContent}>
                  <Typography
                    variant="h5"
                    style={{ textTransform: "capitalize" }}
                  >
                    {difficulty}
                  </Typography>
                  <Typography>
                    {userDetails.bestResults &&
                    userDetails.bestResults[difficulty]
                      ? `Best Time: ${formatTime(
                          userDetails.bestResults[difficulty]
                        )}`
                      : "No result yet"}
                  </Typography>
                </CardContent>
              </Link>
            </CardActionArea>
          </Card>
        </Grid>
      );
    });
  }

  return (
    <>
      <div className={classes.infoContent}>
        <Container maxWidth="sm" justify="center">
          <Typography variant="h6" align="center">
            {userDetails.totalPlayCount
              ? `You have played ${userDetails.totalPlayCount} times and won
                ${userDetails.winCount} times.`
              : `You haven't played yet`}
          </Typography>
          <Button
            className={classes.infoButtons}
            variant="contained"
            color="primary"
            startIcon={<EqualizerIcon />}
            component={Link}
            to="/main/dashboard"
          >
            See dashboard
          </Button>
        </Container>
      </div>
      <Grid container spacing={4}>
        {getDifficultyCards()}
      </Grid>
    </>
  );
}

export default Landing;
