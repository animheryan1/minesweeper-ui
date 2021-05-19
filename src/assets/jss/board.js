const componentStyles = (theme) => ({
  row: {
    display: "flex",
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  textWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "480px",
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(4),
    marginBottom: 0,
  },
});

export default componentStyles;
