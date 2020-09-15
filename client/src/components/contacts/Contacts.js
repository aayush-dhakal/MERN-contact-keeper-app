import React, { useContext, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "./ContactItem";
import Spinner from "../layout/Spinner";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }

  if (filtered && filtered.length === 0) {
    return <h4>No such contact found</h4>;
  }

  return (
    <>
      {(contacts !== null) & !loading ? (
        <>
          {filtered !== null
            ? filtered.map((contact) => (
                <ContactItem contact={contact} key={contact._id} />
              ))
            : contacts.map((contact) => (
                <ContactItem contact={contact} key={contact._id} />
              ))}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Contacts;
