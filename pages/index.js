import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

axios.defaults.baseURL = process.env.URL;

const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      backgroundColor: "#F5F5F5",
      marginTop: `calc(${theme.mixins.toolbar.minHeight} * 4)`,
      width: "75%",
    },
    typo: {
      fontSize: "24px",
    },
  };
});

export default function Home() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography variant="h6" className={classes.typo}>
        This is a small app to organize Todo's. It was done using Next.js and
        Material UI plus MongoDB for a cloud database. You can use the navbar to
        navigate the page. Click "about" to learn more about me or click "list"
        for the list of tasks. <br /> Please don't touch the first eight tasks,
        but feel free to add and edit yours for testing.
      </Typography>
    </Container>
  );
}
