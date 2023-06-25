import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { AiOutlineUserAdd } from 'react-icons/ai';
import "./ChatFriend.css"
function AddContact({ friends, onAddFriend, user }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState('');

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent the page from reloading
    save();
  };

  const save = () => {
    onAddFriend(formData.name);

    // Clear the form data and close the modal
    setFormData({ name: '' });
    toggleModal();
  };

  const size = {
    fontSize: '24px', // Adjust the size as desired
  };
  return (
    <>
      <button type="button" className="btn iconDefinitions button-hover " onClick={toggleModal}>
        <AiOutlineUserAdd className="iconDefinitions" style={size} />
      </button>
      {showModal ? (
        <Modal
          show={showModal}
          onHide={toggleModal}
          centered
          style={{ opacity: 1 }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add new person</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <label htmlFor="person-name" className="form-label">Name:</label>
              <input type="text" className="form-control p-0" id="person-name" name="name" value={formData.name} onChange={handleInputChange} />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-secondary" onClick={toggleModal}>Close</button>
            <button type="submit" className="btn btn-primary" form="add-contact-form" onClick={save}>Save changes</button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  );
}

export default AddContact;
