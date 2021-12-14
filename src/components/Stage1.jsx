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
      //   form is valid...add player
      setError([false, ""]);
      context.addPlayer(value);

      textInput.current.value = "";
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
      setError([true, "Sorry, name must be at least 3 or more char"]);
      return false;
    }
    return true;
  };

  // console.log(context);

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
        {error[0] ? (
          <Alert className="p-2 mt-2" variant="danger">
            {error}
          </Alert>
        ) : (
          ""
        )}
        <Button className="miami border-0 mt-2" variant="primary" type="submit">
          Add player
        </Button>
        {context.state.players && context.state.players.length > 0 ? (
          <div>
            <hr />
            <div>
              <ul className="list-group">
                {context.state.players.map((item, idx) => (
                  <li
                    key={idx}
                    className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                  >
                    {item}
                    <span
                      className="badge badge-danger"
                      onClick={() => context.removePlayer(idx)}
                    >
                      x
                    </span>
                  </li>
                ))}
              </ul>
              <div className="action_button" onClick={() => context.next()}>
                NEXT
              </div>
            </div>
          </div>
        ) : null}
      </Form>
    </div>
  );
};

export default Stage1;
