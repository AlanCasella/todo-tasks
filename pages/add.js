import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => {
  return {
    card: {
      marginTop: `calc(${theme.mixins.toolbar.minHeight} * 2)`,
      marginLeft: "40%",
      width: "20%"
    },
    cardAction: {
      justifyContent: "center",
    },
    title: {
      display: "block",
      width: "98%"
    },
    description: {
      display: "block",
    },
    button: {
      width: "98%"
    }
  };
});

const add = () => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const URL = process.env.URL;

  async function handleSubmit(e) {
    e.preventDefault();
    await axios.post(`https://${URL}/api/tasks/list`, {title, description})
    // await axios.post(`http://${URL}/api/tasks/list`, { title, description });
    router.push("/tasks");
  }

  return (
    <Card className={classes.card} variant="outlined">
      <CardActions className={classes.cardAction}>
        <form noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
          <TextField
            label="Title"
            variant="outlined"
            required
            onChange={(e) => setTitle(e.target.value)}
            margin="dense"
            className={classes.title}
          />
          <TextField
            label="Description"
            variant="outlined"
            required
            multiline
            rows={6}
            onChange={(e) => setDescription(e.target.value)}            
            margin="dense"
            className={classes.description}
          />
          <Button type="submit" className={classes.button} variant="contained" color="primary">Add</Button>
        </form>
      </CardActions>
    </Card>
  );
};

export default add;
