import axios from "axios";
import React, { useState, useEffect } from "react";
import SearchBar from "../Components/SearchBar";
import TodoCard from "../Components/Card";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  return {
    container: {
      marginTop: `calc(${theme.mixins.toolbar.minHeight} * 2)`,
    },
  };
});

function Tasks(props) {
  const classes = useStyles();
  // const ULR = process.env.URL;
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  // const router = useRouter();

  useEffect(() => {
    if (search === "Completed") {
      setData(props.data.filter((f) => f.completed === true));
    } else if (search === "Pending") {
      setData(props.data.filter((f) => f.completed === false));
    } else {
      setData(props.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <Container className={classes.container}>
      <SearchBar search={(search, setSearch)}></SearchBar>
    <Grid container  spacing={1}>
      {!!data &&
        data.length > 0 &&
        data.map((c) => {
          return (
            <Grid item lg={4} md={6} xs={12} sm={12} key={c._id}>
              <TodoCard initialtodo={c} key={c._id}></TodoCard>
            </Grid>
          );
        })}
    </Grid>
    </Container>
  );
}

export async function getServerSideProps() {
  try {
    const URL = process.env.URL;
    const data = await axios.get(`https://${URL}/api/tasks/list`);
    // const data = await axios.get(`http://${URL}/api/tasks/list`);

    if (!data) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        data: data.data,
      },
    };
  } catch (error) {
    console.log(error, "soy el error");
    return {
      props: {},
    };
  }
}

export default Tasks;
