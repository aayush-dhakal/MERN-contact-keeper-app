import React, { useContext, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import ContactContext from "../../context/contact/ContactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);

  const { filterContacts, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const text = useRef("");

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <Form>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Filter Contacts..."
          ref={text}
          onChange={onChange}
        />
      </Form.Group>
    </Form>
  );
};

export default ContactFilter;
