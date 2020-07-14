import React from "react";

import { render, cleanup } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    },
    {
      id: 2,
      name: "Jack Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    },
    {
      id: 3,
      name: "Sara Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const {getByPlaceholderText} = render(<Form interviewers = {interviewers}/>)

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const {getByPlaceholderText} = render(<Form interviewers = {interviewers} name = "Lydia Miller-Jones"/>)
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("Lydia Miller-Jones");
   
  });

  it("save button is disabled when student name is blank",() => {
    const {getByText} = render(<Form interviewers = {interviewers} />)
    expect(getByText("Save")).toBeDisabled();
    
  })

  it("save button is disabled when interviewer is not selected ",() => {
    const {getByText} = render(<Form interviewers = {interviewers} name = "Lydia Miller-Jones" />)
    expect(getByText("Save")).toBeDisabled();
    
  })

  it("save button is enabled when student name is not blank and interviewer is  selected ",() => {
    const {getByText} = render(<Form interviewers = {interviewers} name = "Lydia Miller-Jones" interviewer = {1} />)
    expect(getByText("Save")).toBeEnabled();
    
  })

  it("calls onSave function when the save button is enabled and clicked ",() => {
    const onSave = jest.fn();
    const {getByText} = render(<Form interviewers = {interviewers} name = "Lydia Miller-Jones" interviewer = {1} onSave ={onSave} />)

    fireEvent.click(getByText("Save"));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones",1)
    
  })

  it("submits the name the user inputs ",() => {
  const onSave = jest.fn();
  const { getByText, getByPlaceholderText } = render(
    <Form interviewers={interviewers} onSave={onSave} interviewer= {1}/>
  );

  const input = getByPlaceholderText("Enter Student Name");

  fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });

  fireEvent.click(getByText("Save"));

  expect(onSave).toHaveBeenCalledTimes(1);
  expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
    
  })

  it("it calls onCancel and reset the input field ",() => {
    const onSave = jest.fn();
    const onCancel =jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Form interviewers={interviewers} onSave={onSave} interviewer= {1} onCancel ={onCancel}/>
    );
  
    const input = getByPlaceholderText("Enter Student Name");
  
    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
  
    fireEvent.click(getByText("Cancel"));
  
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue("");
      
    })


});