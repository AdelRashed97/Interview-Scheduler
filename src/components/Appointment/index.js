import React from "react"
import Header from "./Header"
import "./style.scss" 
import useVisualMode from "../../hooks/useVisualMode"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE ="CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING"


export default function Appointmnet(props) {
  const {interview,time,interviewers,id,bookInterview,cancelInterview}=props
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

  const cancel = function (c) {
    transition(DELETING);
    cancelInterview(id)
    .then(() => transition(EMPTY))
  }
  
  
 
  return (<article className="appointment">
    <Header time={time}/>
    

    {mode === EMPTY && <Empty onAdd={()=>transition(CREATE) }/>}

    {mode === SHOW && <Show student ={interview.student} interviewer ={ interview.interviewer} onDelete ={() => transition(CONFIRM)} onEdit ={() => console.log("edit")}/>}

    {mode === CREATE && <Form interviewers ={interviewers} onCancel = {back} onSave={save}/>}

    {mode === SAVING  && <Status message ="Saving"/>}

    {mode === DELETING  && <Status message ="Deleting"/>}

    {mode === CONFIRM && <Confirm onCancel={back} onConfirm={cancel} message = "Are you sure you want to delete ?"/>}

  </article>)
}