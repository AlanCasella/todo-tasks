import { useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => {
  return {
    card: {
      width: "90%",
    },
    tittle: {
      fontSize: "24px",
    },
    typo: {
      fontSize: "16px",
      whiteSpace: "pre",
    },
    typo2: {
      fontSize: "16px",
      wordWrap: "break-word"
    }
  };
});

function TodoCard({ initialtodo, single }) {
  const [todo, setTodo] = useState(initialtodo);
  const URL = process.env.URL;
  const router = useRouter();
  const classes = useStyles();

  async function taskDelete(id) {
    //   e.preventDefault()
    Swal.fire({
      title: "Are you sure you want to delete?",
      showCancelButton: true,
      confirmButtonText: `Yes, delete`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Task deleted!",
          "",
          "success"
        );
        await axios.delete(`https://${URL}/api/tasks/${id}`);
        // await axios.delete(`http://${URL}/api/tasks/${id}`);

        if(router.pathname === "/tasks") {
          window.location.reload()
        } else {
          router.replace("/tasks")
        }
      } else {
        Swal.fire("Nothing was deleted");
      }
    });
  }

  async function completed(e, id) {
    await axios.put(`https://${URL}/api/tasks/${id}`, {
      completed: e.target.checked,
    });
    // await axios.put(`http://${URL}/api/tasks/${id}`, {
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

  return (
    <Card variant="outlined" className={classes.card}>
      <CardContent>
        <Link 
        href={`/${todo._id}?edit=false`}
         className={classes.tittle}>
          {todo.title}
        </Link>
        {single ? <Typography variant="h6" className={classes.typo2}>
          {todo.description}
        </Typography> : <Typography variant="h6" noWrap={true} className={classes.typo}>
          {todo.description}
        </Typography>}
        
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push(`/${todo._id}?edit=true`)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => taskDelete(todo._id)}
        >
          Delete
        </Button>
      </CardActions>
      <CardActions>
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
      </CardActions>
    </Card>
  );
}

export default TodoCard;
