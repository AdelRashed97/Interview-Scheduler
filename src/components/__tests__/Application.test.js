import React from "react";

import { render, cleanup ,waitForElement,fireEvent,getByText,prettyDOM,getAllByTestId, getByAltText,queryByText, getByPlaceholderText, waitForElementToBeRemoved,act} from "@testing-library/react";


import Application from "components/Application";

import axios from "axios"




describe("Application",() => {
  beforeEach(cleanup);

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container,"Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    
    const appointment = appointments[1];
    
  
    fireEvent.click(getByAltText(appointment,"Delete"));

    expect(getByText(appointment, "Are you sure you want to delete ?")).toBeInTheDocument();

    fireEvent.click(getByText(appointment,"Confirm"));

    expect(getByText(appointment,"Deleting")).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));

    expect(getByAltText(appointment, "Add")).toBeInTheDocument();

   const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  

  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  


  });


  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container,"Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    
    const appointment = appointments[1];
  
    fireEvent.click(getByAltText(appointment,"Edit"));



    fireEvent.click(getByAltText(appointment,"Sylvia Palmer"));

    fireEvent.click(getByText(appointment,"Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));

    expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();


  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container} = render(<Application />);

    await waitForElement(() => getByText(container,"Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment,"Add"))

    fireEvent.change(getByPlaceholderText(appointment,"Enter Student Name"), { target: { value: "Lydia Miller-Jones" } });

    fireEvent.click(getByAltText(appointment,"Sylvia Palmer"));

    fireEvent.click(getByText(appointment,"Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));

    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();


  });

  it("shows the save error when failing to save an appointment", async() => {
    axios.put.mockRejectedValueOnce();
    const { container} = render(<Application />);

    await waitForElement(() => getByText(container,"Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment,"Add"))

    fireEvent.change(getByPlaceholderText(appointment,"Enter Student Name"), { target: { value: "Lydia Miller-Jones" } });

    fireEvent.click(getByAltText(appointment,"Sylvia Palmer"));

    fireEvent.click(getByText(appointment,"Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));

    expect(getByText(appointment,"Could not save appointment.")).toBeInTheDocument();

  
  });



  it("shows the delete error when failing to save an appointment", async() => {
    axios.delete.mockRejectedValueOnce();
    const { container} = render(<Application />);

    await waitForElement(() => getByText(container,"Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    
    const appointment = appointments[1];
  
    fireEvent.click(getByAltText(appointment,"Delete"));

    expect(getByText(appointment, "Are you sure you want to delete ?")).toBeInTheDocument();

    fireEvent.click(getByText(appointment,"Confirm"));

    expect(getByText(appointment,"Deleting")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment,"Deleting"))

    expect(getByText(appointment,"Could not delete appointment.")).toBeInTheDocument();

    




  })

})
