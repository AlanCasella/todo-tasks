import axios from "axios"
import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import TodoCard from "../Components/Card"

const useStyles = makeStyles((theme) => {
  return {
    card: {
      marginTop: `calc(${theme.mixins.toolbar.minHeight} * 2)`,
      width: "100%"
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
      width: "100%"
    },
    container: {
      marginTop: `calc(${theme.mixins.toolbar.minHeight} * 2)`,
    },
  };
});

function Todo({ todo }) {
  const classes = useStyles()
  const ULR = process.env.URL
  const router = useRouter();
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);


  async function handleSubmit(e, id) {
    e.preventDefault();
    await axios.put(`https://${ULR}/api/tasks/${id}`, {
      title,
      description,
    });
    // await axios.put(`http://${ULR}/api/tasks/${id}`, {
    //   title,
    //   description,
    // });
    router.push("/tasks");
  }

  async function completed(e, id) {
    await axios.put(`https://${ULR}/api/tasks/${id}`, {
      completed: e.target.checked,
    });
    // await axios.put(`http://${ULR}/api/tasks/${id}`, {
    //   completed: e.target.checked,
    // });

    const Toast = Swal.mixin({
      toast: true,
      position: "bottom",
      showConfirmButton: false,
      timer: 3000,
      background: "black",
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    if (e.target.checked === true) {
      Toast.fire({
        icon: "success",
        title: "Marked as completed",
      });
    } else {
      Toast.fire({
        icon: "success",
        title: "Marked as pending",
      });
    }
  }

  return router.query.edit === "true" ? (
    <Card className={classes.card} variant="outlined">
      <CardActions className={classes.cardAction}>
      <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={todo.completed}
                onChange={(e) => completed(e, todo._id)}
                name={todo._id}
              />
            }
            label="Completed"
          ></FormControlLabel>
        </FormGroup>
        <form noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e, todo._id)}>
          
          <TextField
            fullWidth
            label="Title"            
            defaultValue={title}
            variant="outlined"
            required
            onChange={(e) => setTitle(e.target.value)}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Description"
            defaultValue={description}
            variant="outlined"
            required
            multiline
            rows={9}
            onChange={(e) => setDescription(e.target.value)}            
            margin="dense"
          />
          <Button type="submit" className={classes.button} variant="contained" color="primary">Confirm Edit</Button>
        
        </form>
      </CardActions>
    </Card>
  ) :
  <Grid container className={classes.container} spacing={1}>
  <TodoCard initialtodo={todo} single={true}></TodoCard>
  </Grid>
  ;
}



export async function getServerSideProps(context) {

  try {
    const URL = process.env.URL
    const todo =  await axios.get(`https://${URL}/api/tasks/${context.params.id}`);
    // const todo =  await axios.get(`http://${URL}/api/tasks/${context.params.id}`);

    if(!todo) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: {
        todo: todo.data
      }
    }
  } catch (error) {
    console.log("este es el error: ", error)
    return {
      props: {}
    }
  }
  
}

export default Todo;
