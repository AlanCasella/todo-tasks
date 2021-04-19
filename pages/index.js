import Head from 'next/head'
import s from '../styles/home.module.css'
// import dbConnect from "../utils/DBconnect"
import axios from "axios";

axios.defaults.baseURL = process.env.URL

export default function Home() {
  // dbConnect();
  return (
    <div className={s.homeDiv}>
      <span className={s.homeP}>This is a small app to organize Todo's. <br/>You can use the navbar to navigate or click&nbsp;</span>
        <a href="/tasks" className={s.homeA}><br/>here</a> <span><br/>&nbsp;to go to the list of Todo's, or click&nbsp;</span>
        <a href="/add" className={s.homeA}><br/>here</a> <span><br/>&nbsp;to add one to the list.
      </span>
    </div>
  )
}
