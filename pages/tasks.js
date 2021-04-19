import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import SearchBar from "../Components/SearchBar";
import s from "../styles/tasks.module.css";

function Tasks(props) {
  const ULR = process.env.URL
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== "/tasks") {
      setTitle(props.data[0].title);
      setDescription(props.data[0].description);
      
    }

    if(search === "Completed") {
      setData(props.data.filter(f => f.completed === true))
    } else if(search === "Pending") {
      setData(props.data.filter(f => f.completed === false))
    } else {
      setData(props.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  async function taskDelete(id) {
    var result = confirm("Want to delete?");
    if (result) {
      await axios.delete(`https://${ULR}/api/tasks/${id}`);
      window.location.reload();
    }
  }

  async function taskEdit(e, id) {
    if (router.pathname === "/tasks") {
      router.push(`/${id}`);
    } else {
      setShow(true);
    }
  }

  async function completed(e, id) {
    await axios.put(`https://${ULR}/api/tasks/${id}`, {completed: e.target.checked});

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
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

  function handleInput(e) {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    }
  }

  async function taskConfirmEdit(e, id) {
    e.preventDefault();
    await axios.put(`https://${ULR}/api/tasks/${id}`, {
      title,
      description,
    });
    setShow(false);
    window.location.reload();
  }

  return (
    <div className={s.divTasksCardContainer}>
      {(router.pathname === "/tasks") ? <SearchBar search={(search, setSearch)} /> : null}
      {!show ? (
        !!data &&
        data.length > 0 &&
        data.map((c) => {
          return (
            <div key={c._id} className={s.divTasksTarjeta}>
              <div className={s.divTasksTitulo}>
                <Link href={`/${c._id}`}>
                  <h2>{c.title}</h2>
                </Link>
              </div>
              <div className={s.divTasksDescripcion}>
                <h5>{c.description}</h5>
              </div>
              <div className={s.divTasksButtons}>
                <button
                  className={s.TasksButtons}
                  onClick={(e) => taskEdit(e, c._id)}
                >
                  Edit
                </button>
                <button
                  className={s.TasksButtons}
                  onClick={() => taskDelete(c._id)}
                >
                  Delete
                </button>
              </div>
              <form className={s.TaskForm}>
                <label htmlFor={c._id}>
                  <input
                    type="checkbox"
                    id={c._id}
                    name={c._id}
                    defaultChecked={c.completed}
                    onChange={(e) => completed(e, c._id)}
                  ></input>
                  Completed
                </label>
              </form>
            </div>
          );
        })
      ) : (
        //Second part of edit
        <div className={s.divTasksTarjeta}>
          <form>
            <div className={s.divTasksTitulo}>
              <textarea
                className={s.TaskInputTitle}
                type="textarea"
                name="title"
                onChange={(e) => handleInput(e)}
                value={title}
              ></textarea>
            </div>
            <div className={s.divTasksDescripcion}>
              <textarea
                className={s.TaskInputDescription}
                type="textarea"
                name="description"
                onChange={(e) => handleInput(e)}
                value={description}
              ></textarea>
            </div>
            <div className={s.divTasksButtons}>
              <button
                className={s.TasksButtonConfirm}
                onClick={(e) => taskConfirmEdit(e, props.data[0]._id)}
              >
                Confirm Edit
              </button>
            </div>
          </form>

          <form className={s.TaskForm}>
            <label htmlFor={props.data[0]._id}>
              <input
                type="checkbox"
                id={props.data[0]._id}
                name={props.data[0]._id}
                defaultChecked={props.data[0].completed}
                onChange={(e) => completed(e, props.data[0]._id)}
              ></input>
              Completed
            </label>
          </form>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
try {
  const URL = process.env.URL
  const data = await axios.get(`https://${URL}/api/tasks/list`);

    if(!data) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        data: data.data
      }
    }
  } catch (error) {
    console.log(error, "soy el error")
        return {
          props: {}
        }
      }
    }

export default Tasks;
