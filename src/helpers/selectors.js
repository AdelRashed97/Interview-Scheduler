
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
