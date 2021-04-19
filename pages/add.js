import axios from "axios";
import React, { useState } from "react";
import { useRouter } from 'next/router'
import s from "../styles/tasks.module.css";

const add = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const URL = process.env.URL

  function handleInput(e) {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    }
  }

  async function handleAdd(e) {
      e.preventDefault()
    await axios.post(`https://${URL}/api/tasks/list`, {title, description})
    router.push("/tasks")
  }

  return (
    <div className={s.divTasksTarjeta}>
      <form>
        <div className={s.divTasksTitulo}>
          <textarea
            className={s.TaskInputTitle}
            type="textarea"
            name="title"
            onChange={(e) => handleInput(e)}
            placeholder="Enter title"
          ></textarea>
        </div>
        <div className={s.divTasksDescripcion}>
          <textarea
            className={s.TaskInputDescription}
            type="textarea"
            name="description"
            onChange={(e) => handleInput(e)}
            placeholder="Enter description"
          ></textarea>
        </div>
        <div className={s.divTasksButtons}>
          <button className={s.TasksButtonConfirm} onClick={(e) => handleAdd(e)}>Add Task</button>
        </div>
      </form>
    </div>
  );
};

export default add;
