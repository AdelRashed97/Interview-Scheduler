import React from "react"
import Header from "./Header"
import "./style.scss" 
import useVisualMode from "../../hooks/useVisualMode"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE ="CREATE";
const SAVING = "SAVING";


export default function Appointmnet(props) {
  const {interview,time,interviewers,id,bookInterview}=props
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function (name,interviewer) {
    const interview = { 
      student: name,
      interviewer  
    }
    transition(SAVING);
    bookInterview(id,interview)
    .then(() => transition(SHOW))


  }
  
 
  return (<article className="appointment">
    <Header time={time}/>
    

    {mode === EMPTY && <Empty onAdd={()=>transition(CREATE) }/>}

    {mode === SHOW && <Show student ={interview.student} interviewer ={ interview.interviewer} onDelete ={() => console.log("delete")} onEdit ={() => console.log("edit")}/>}

    {mode === CREATE && <Form interviewers ={interviewers} onCancel = {back} onSave={save}/>}

    {mode === SAVING  && <Status message ="Saving"/>}

  </article>)
}