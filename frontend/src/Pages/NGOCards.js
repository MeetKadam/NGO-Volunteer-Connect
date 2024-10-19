import { useEffect, useState } from "react";
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import "./NgoCards.css";
import Navbar from "../components/Navbar/Navbar";

// Set the app element for accessibility
Modal.setAppElement('#root');

export default function NgoCards() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  // Fetch projects from the backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects(); // Fetch projects when component mounts
  }, []);

  // Open the modal when a project card is clicked
  const openModal = (project) => {
    setSelectedProject(project);
    setModalIsOpen(true);
  };

  // Close the modal and reset state
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProject(null);
    setName("");
    setEmail("");
    setPhone("");
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const volunteerData = {
      name,
      email,
      phone,
    };
  
    try {
      // Submit the volunteer data directly
      await axios.post("http://localhost:5000/api/regis/eventRegister", volunteerData);
      closeModal();
      navigate('/'); // Navigate to the volunteers page
    } catch (error) {
      console.error("Error submitting volunteer data:", error.response ? error.response.data : error.message);
      alert("There was an error submitting your application. Please try again.");
    }
  };
  

      // Submit the volunteer data
  

  return (
    <div className="projects-grid">
        <Navbar/>
      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        projects.map((project, index) => ( // Using index as the key
          <div key={index} className="project-card" onClick={() => openModal(project)}>
            <img
              src={project.image ? project.image : `/imgs/${project.filename}`}
              alt={project.eventname}
              className="project-image"
            />
            <div className="project-details">
              <h2>{project.eventname}</h2>
              <p className="project-description">{project.description}</p>
              <p><strong>City:</strong> {project.city}</p>
              <p><strong>Skills:</strong> {project.skills}</p>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: '100%', background: '#e0e0e0', borderRadius: '5px' }}>
                  <div
                    className="progress"
                    style={{
                      width: `${project.progress}%`,
                      background: '#76c7c0',
                      height: '10px',
                      borderRadius: '5px',
                    }}
                  ></div>
                </div>
                <span>{project.progress}%</span>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Modal for input fields */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Volunteer Form"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '400px', // Set modal width
          },
        }}
      >
        <h2>Volunteer for {selectedProject?.eventname}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}
