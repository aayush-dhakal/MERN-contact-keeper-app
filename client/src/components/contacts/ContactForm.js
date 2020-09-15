import React, { useContext, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import ContactContext from "../../context/contact/ContactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, current, updateContact, clearCurrent } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <Form onSubmit={onSubmit} className="mb-3">
      <h3 className="text-center text-primary mb-3">
        {current ? "Edit Contact" : "Add Contact"}
      </h3>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Phone"
          name="phone"
          value={phone}
          onChange={onChange}
        />
      </Form.Group>

      <p>Contact Type</p>
      <Form.Group>
        <Form.Check
          inline
          type="radio"
          label="Personal"
          name="type"
          value="personal"
          // with this id you can click on the label and it will check the radio button
          id="formHorizontalRadios1"
          checked={type === "personal"}
          onChange={onChange}
        />
        <Form.Check
          inline
          type="radio"
          label="Professional"
          name="type"
          value="professional"
          id="formHorizontalRadios2"
          checked={type === "professional"}
          onChange={onChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" block>
        {current ? "Update Contact" : "Add Contact"}
      </Button>
      {current && (
        <Button variant="secondary" block onClick={clearAll}>
          Clear Contact
        </Button>
      )}
    </Form>
  );
};

export default ContactForm;
