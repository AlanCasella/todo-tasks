import Tasks from "./tasks"
import axios from "axios"
import React, { useState } from "react";

function Todo({ todo }) {
  return (
    <div>
      <Tasks data={[todo]}/>
    </div>
  );
}



export async function getServerSideProps(context) {

  try {
    const URL = process.env.URL
    const todo =  await axios.get(`https://${URL}/api/tasks/${context.params.id}`);

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
