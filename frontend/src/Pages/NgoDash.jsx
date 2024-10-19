import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import axios from 'axios';
import Modal from './Modal'; // Import the Modal component
import "./Dash.css";
import Navbar2 from "../components/Navbar/Navbar2";

export default function NgoDash() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: "",
    timeline: "",
    description: "",
    city: "",
    skills: "",
    progress: 0,
    image: null,
  });

  const [activeTab, setActiveTab] = useState("projects");
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [registrations, setRegistrations] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const addProject = async () => {
    if (!newProject.name || !newProject.timeline) {
      alert("Please fill out the required fields!");
      return;
    }

    const formData = new FormData();
    formData.append('productImage', newProject.image);
    formData.append('eventname', newProject.name);
    formData.append('description', newProject.description);
    formData.append('city', newProject.city);
    formData.append('skills', newProject.skills);
    formData.append('time', newProject.timeline);

    try {
      await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      resetNewProject();
      fetchProjects();
    } catch (error) {
      console.error("Error uploading project data:", error);
      alert("Failed to upload project data. Please try again.");
    }
  };

  const resetNewProject = () => {
    setNewProject({
      name: "",
      timeline: "",
      description: "",
      city: "",
      skills: "",
      progress: 0,
      image: null,
    });
  };

  const handleProjectClick = async (projectId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/regis/getAllRegistrations?projectId=${projectId}`);
      setRegistrations(response.data);
      setModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar2/>
      <h1 className="dashboard-title">NGO Project Dashboard</h1>
      <div className="tabs">
        <button className={`tab ${activeTab === "projects" ? "active" : ""}`} onClick={() => setActiveTab("projects")}>
          Projects
        </button>
        <button className={`tab ${activeTab === "add-project" ? "active" : ""}`} onClick={() => setActiveTab("add-project")}>
          Add Project
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "projects" && (
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project._id} className="project-card" onClick={() => handleProjectClick(project._id)}>
                <img src={`/imgs/${project.filename}`} alt={project.eventname} className="project-image" />
                <div className="project-details">
                  <h2>{project.eventname}</h2>
                  <p className="project-description">{project.description}</p>
                  <p><strong>City:</strong> {project.city}</p>
                  <p><strong>Skills:</strong> {project.skills}</p>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div className="progress" style={{ width: `${project.progress}%` }}></div>
                    </div>
                    <span>{project.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "add-project" && (
          <div className="card">
            <h2>Add New Project</h2>
            <input
              type="text"
              placeholder="Project Name"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Timeline (hours)"
              value={newProject.timeline}
              onChange={(e) => setNewProject({ ...newProject, timeline: e.target.value })}
            />
            <textarea
              placeholder="Project Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            ></textarea>
            <input
              type="text"
              placeholder="City"
              value={newProject.city}
              onChange={(e) => setNewProject({ ...newProject, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="Required Skills (comma-separated)"
              value={newProject.skills}
              onChange={(e) => setNewProject({ ...newProject, skills: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewProject({ ...newProject, image: e.target.files[0] })}
            />
            <button className="btn-submit" onClick={addProject}>
              <PlusCircle size={16} /> Add Project
            </button>
          </div>
        )}
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} registrations={registrations} />
    </div>
  );
}
