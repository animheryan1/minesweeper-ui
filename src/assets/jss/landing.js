const componentStyles = (theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  infoContent: {
    textAlign: "center",
    padding: theme.spacing(6, 0),
  },
  infoButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  easy: {
    backgroundColor: "#459c21",
  },
  medium: {
    backgroundColor: "#ffb100",
  },
  hard: {
    backgroundColor: "#8a1d1d",
  },
  button: {
    backgroundColor: "white",
  },
  title: {
    flexGrow: 1,
  },
  cardContent: {
    flexGrow: 1,
  },
  formControl: {
    marginTop: theme.spacing(4),
  },
  tableHead: {
    backgroundColor: "#d7ddfd",
  },
  currentUser: {
    backgroundColor: "#f1e234",
  },
  tableWrapper: {
    marginBottom: theme.spacing(6),
  },
});

export default componentStyles;
