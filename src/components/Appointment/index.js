import React from "react"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import "./style.scss" 
import useVisualMode from "../../hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE ="CREATE"



export default function Appointmnet(props) {
  const {interview,time}=props
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
 
  return (<article className="appointment">
    <Header time={time}/>
    

    {mode === EMPTY && <Empty onAdd={()=>transition(CREATE) }/>}

    {mode === SHOW && <Show student ={interview.student} interviewer ={ interview.interviewer} onDelete ={() => console.log("delete")} onEdit ={() => console.log("edit")}/>}

  </article>)
}