import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

import styles from "../assets/jss/landing";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { UserContext } from "../contexts/UserContext";
import formatTime from "../utils/helpers";
const useStyles = makeStyles(styles);

function Dashboard() {
  const classes = useStyles();
  const [selectedDifficulty, setDifficulty] = useState("medium");
  const [usersData, setUsersData] = useState([]);

  const { userDetails } = useContext(UserContext);

  const handleChange = (event) => {
    setDifficulty(event.target.value);
  };

  async function getPlayers() {
    const { data } = await axios.get("http://localhost:8050/users", {
      params: {
        sort: `bestResults.${selectedDifficulty}`,
        asc: true,
        [`bestResults.${selectedDifficulty}`]: "",
        limit: 10,
      },
    });
    setUsersData(data);
  }

  useEffect(() => {
    getPlayers();
  }, [selectedDifficulty]);

  return (
    <>
      <div className={classes.infoContent}>
        <Container maxWidth="sm" justify="center">
          <Typography variant="h6" align="center">
            Let's see how others play!
          </Typography>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="difficulty-select">Select difficulty</InputLabel>
            <Select
              labelId="difficulty-select"
              value={selectedDifficulty}
              onChange={handleChange}
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>
        </Container>
      </div>
      <TableContainer component={Paper} className={classes.tableWrapper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Best Time</TableCell>
              <TableCell>Played games</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData.map((user, index) => (
              <TableRow
                key={user._id}
                className={
                  user._id === userDetails._id ? classes.currentUser : ""
                }
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>
                  {formatTime(user.bestResults[selectedDifficulty])}
                </TableCell>
                <TableCell>{user.totalPlayCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Dashboard;
