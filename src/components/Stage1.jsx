import React, { useState, useContext, useRef } from "react";

import { MyContext } from "../context";

import { Button, Form, Alert } from "react-bootstrap";

const Stage1 = () => {
  const textInput = useRef();
  const context = useContext(MyContext);
  const [error, setError] = useState([false, ""]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = textInput.current.value;
    const validate = validateInput(value);

    if (validate) {
      console.log(value);
    } else {
      console.log("error");
    }
  };

  const validateInput = (value) => {
    if (value === "") {
      setError([true, "Sorry, you need to add a name"]);
      return false;
    }
    if (value.length <= 2) {
      setError([true, "Sorry, name must be 3 or more char at least"]);
      return false;
    }
    return true;
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Add player name"
            ref={textInput}
          />
        </Form.Group>
        <Button className="miami mt-2" variant="primary" type="submit">
          Add player
        </Button>
      </Form>
    </div>
  );
};

export default Stage1;