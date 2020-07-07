import React from "react";

import "components/InterviewListItem.scss";
import classNames from "classnames";

export default function(props) {
  const interviewerClass = classNames({
    "interviewers__item":true,
    "interviewers__item--selected":props.selected,
  })
  return (
    <li className={interviewerClass} onClick= {() => props.setInterviewer(props.id)}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>
  )
}