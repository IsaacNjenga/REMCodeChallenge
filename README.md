# Multi-Step Form with Ant Design (Skip Hire Application)

This project implements a multi-step form in React using **Ant Design (antd)** for a skip hire service. The form is split into several logical steps, each collecting a different part of the user's input, and displays a summary on the final step.

## Features

- Multi-step form navigation using Ant Design's `Steps`
- Shared global form state using `Form` and `form` instance
- Data persistence between steps
- Modal confirmation with data injection into the main form
- Validation before navigating to next step
- Summary page displaying all collected information

---

## Technologies Used

- React
- Ant Design (`antd`)
- SweetAlert2 for alert modals
- React Hooks (`useState`, `useEffect`)
- Modular component design

---

## Project Structure
/src
  ├── components/
  │     ├── AddressSelection.js
  │     ├── WasteSelection.js
  │     ├── SkipSelection.js
  │     ├── ModalPage.js
  │     └── FinalPage.js
  ├── pages/
  │     └── Home.js
  └── App.js

## Core Design Approach
Single Source of Truth with Form
A single global <Form form={form}> is defined in Home.js. This form instance is passed down to all step components via props to ensure centralized state management.

## Step-by-Step Navigation
The steps are defined as an array:
const steps = [
  { key: "postcode", content: <AddressSelection form={form} /> },
  { key: "waste", content: <WasteSelection form={form} /> },
  { key: "skip", content: <SkipSelection form={form} next={next} form={form} /> },
  { key: "final", content: <FinalPage form={form} /> }
];
Each component renders only the relevant fields for its step.

## Validation and Controlled Navigation
Before moving to the next step, form.validateFields() ensures all required inputs are completed. On error, a SweetAlert informs the user.

const next = async () => {
  try {
    await form.validateFields();
    setCurrent(current + 1);
  } catch {
    Swal.fire({ icon: "warning", title: "Wait", text: "Please complete the current step before continuing." });
  }
};

## Modal Integration
In the skip selection step, a modal (ModalPage) is opened when a skip type is selected. Once confirmed, the selection is injected into the form using:

form.setFieldsValue({ skipSelection: modalContent });
This keeps everything within the form's state and avoids duplication.

## Final Page Summary
On the final step, FinalPage accesses all data using:

form.getFieldsValue(true);
This renders a full snapshot of all form values for review or confirmation.

Notes:
All form fields are rendered within <Form.Item name="...">.
Form.List is used for repeatable data (e.g., multiple addresses or waste types).
No additional <Form> components are created inside children — all data lives in the root.
The modal does not contain its own form; it simply updates the root form via props.
