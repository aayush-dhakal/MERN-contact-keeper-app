import React, { useContext } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import ContactContext from "../../context/contact/ContactContext";

const ContactItem = ({ contact }) => {
  const { _id, name, email, type, phone } = contact;

  const { deleteContact, setCurrent, clearCurrent, clearFilter } = useContext(
    ContactContext
  );

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent(); // if the contact is in edit mode and if any contact is deleted then we want to clear the current contact too
    clearFilter(); // if the contact is in filtering mode and if any contact is deleted then we want to clear the filtered contact too
  };

  const onEdit = () => {
    setCurrent(contact);
    // if there are many contacts then it will display in a scrollable. If you click on edit on the contact that is at the bottom then the fields on the form will be filled but it will remain on the bottom only. So to scroll back at the top where there is form we use this code
    window.scrollTo(0, 0);
  };

  return (
    <Card bg="light mb-3">
      <Card.Body>
        <div className="d-flex flex-row mb-0">
          <h5 className="text-info">{name}</h5>

          <div className="ml-auto">
            <Badge
              className="p-1"
              variant={type === "professional" ? "success" : "primary"}
            >
              {type}
            </Badge>
          </div>
        </div>

        <div>
          <i className="fas fa-envelope-open mr-2"></i>
          {email}
        </div>
        
        {/* phone is not required so we use conditional to display it */}
        {phone && (
          <div>
            <i className="fas fa-phone mr-2"></i>
            {phone}
          </div>
        )}

        <Button variant="dark" className="mt-2 mr-1 btn-sm" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="danger" className="mt-2 btn-sm" onClick={onDelete}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ContactItem;
