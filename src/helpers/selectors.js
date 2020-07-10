
 export function getAppointmentsForDay(state,name) {
  // check if days array is not empty
  if (state.days.length !== 0) {   
    const day = state.days.filter(day => day.name === name)[0];
    // check that day is defined
    if (day) {
      // check that the day object has key appointmnet with non zero array as value
      if (day.appointments !== undefined && day.appointments.length !== 0) {
        const appointmentsIdForDay = day.appointments; // appointments id for selected day
        const appointmentsArray = Object.values(state.appointments);// store the appointments in an array
        const filteredAppointments = appointmentsArray.filter(appointment => appointmentsIdForDay.includes(appointment.id))
       return filteredAppointments


      }

    } else {
      return []
    }

  } else {
    return [];
  }

}

export function getInterview(state,interview) {
  if (interview !== null) {
    const interviewerID = interview.interviewer;
    const interviewer = state.interviewers[interviewerID];

    return {student:interview.student, interviewer};

  } else {
    return null
  }
}

export function getInterviewersForDay(state,name) {
  // check if days array is not empty
  if (state.days.length !== 0) {   
    const day = state.days.filter(day => day.name === name)[0];
    // check that day is defined
    if (day) {
      // check that the day object has key appointmnet with non zero array as value
      if (day.interviewers !== undefined && day.interviewers.length !== 0) {
        const interviewersIdForDay = day.interviewers; // interviewers id for selected day
        const interviewersArray = Object.values(state.interviewers);// store the interviewers in an array
        const filteredinterviewers = interviewersArray.filter(interviewer => interviewersIdForDay.includes(interviewer.id))
       return filteredinterviewers


      }

    } else {
      return []
    }

  } else {
    return [];
  }

}
