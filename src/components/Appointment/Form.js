import React from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";
import  { useState } from "react";

export default function Form(props) {
  const [name,setName] = useState(props.name || "")
  const [interviewer,setInterviewer] = useState(props.interviewer || null)
  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        value={name}
        type="text"
        placeholder="Enter Student Name"
        onChange={(event) => setName(event.target.value)}
      />
    </form>
    <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick ={props.onCancel}>Cancel</Button>
      <Button confirm onClick={() => props.onSave(name,interviewer)}>Save</Button>
    </section>
  </section>
</main>
  )
}