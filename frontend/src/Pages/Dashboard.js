"use client"

import { useState } from "react"
import { PlusCircle, CheckCircle, XCircle } from "lucide-react"

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const [newProject, setNewProject] = useState({ name: "", timeline: "", progress: 0 })
  const [newTask, setNewTask] = useState({ projectIndex: 0, name: "", assignee: "" })
  const [newResource, setNewResource] = useState({ projectIndex: 0, name: "", quantity: 0 })
  const [activeTab, setActiveTab] = useState("projects")

  const addProject = () => {
    if (newProject.name && newProject.timeline) {
      setProjects([...projects, { ...newProject, tasks: [], resources: [], volunteers: 0 }])
      setNewProject({ name: "", timeline: "", progress: 0 })
    }
  }

  const addTask = () => {
    if (newTask.name && newTask.assignee) {
      const updatedProjects = [...projects]
      updatedProjects[newTask.projectIndex].tasks.push(newTask)
      setProjects(updatedProjects)
      setNewTask({ projectIndex: 0, name: "", assignee: "" })
    }
  }

  const addResource = () => {
    if (newResource.name && newResource.quantity > 0) {
      const updatedProjects = [...projects]
      updatedProjects[newResource.projectIndex].resources.push(newResource)
      setProjects(updatedProjects)
      setNewResource({ projectIndex: 0, name: "", quantity: 0 })
    }
  }

  const updateProgress = (projectIndex, newProgress) => {
    const updatedProjects = [...projects]
    updatedProjects[projectIndex].progress = newProgress
    setProjects(updatedProjects)
  }

  const updateVolunteers = (projectIndex, change) => {
    const updatedProjects = [...projects]
    updatedProjects[projectIndex].volunteers += change
    setProjects(updatedProjects)
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">NGO Project Dashboard</h1>
      <div className="tabs">
        <button className={`tab ${activeTab === "projects" ? "active" : ""}`} onClick={() => setActiveTab("projects")}>Projects</button>
        <button className={`tab ${activeTab === "tasks" ? "active" : ""}`} onClick={() => setActiveTab("tasks")}>Tasks</button>
        <button className={`tab ${activeTab === "resources" ? "active" : ""}`} onClick={() => setActiveTab("resources")}>Resources</button>
      </div>
      <div className="tab-content">
        {activeTab === "projects" && (
          <div className="projects-tab">
            <div className="card">
              <h2>Add New Project</h2>
              <input
                type="text"
                placeholder="Project Name"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Timeline (e.g., 3 months)"
                value={newProject.timeline}
                onChange={(e) => setNewProject({ ...newProject, timeline: e.target.value })}
              />
              <button className="btn" onClick={addProject}>Add Project</button>
            </div>
            {projects.map((project, index) => (
              <div key={index} className="card">
                <h2>{project.name}</h2>
                <p>Timeline: {project.timeline}</p>
                <div className="progress-container">
                  <span>Progress:</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={project.progress}
                    onChange={(e) => updateProgress(index, parseInt(e.target.value))}
                  />
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${project.progress}%` }}></div>
                </div>
                <div className="volunteers">
                  <span>Volunteers: {project.volunteers}</span>
                  <button className="btn-icon" onClick={() => updateVolunteers(index, 1)}>
                    <PlusCircle />
                  </button>
                  <button className="btn-icon" onClick={() => updateVolunteers(index, -1)}>
                    <XCircle />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "tasks" && (
          <div className="tasks-tab">
            <div className="card">
              <h2>Add New Task</h2>
              <select
                value={newTask.projectIndex}
                onChange={(e) => setNewTask({ ...newTask, projectIndex: parseInt(e.target.value) })}
              >
                {projects.map((project, index) => (
                  <option key={index} value={index}>
                    {project.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Task Name"
                value={newTask.name}
                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Assignee"
                value={newTask.assignee}
                onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
              />
              <button className="btn" onClick={addTask}>Add Task</button>
            </div>
            {projects.map((project, projectIndex) => (
              <div key={projectIndex} className="card">
                <h2>{project.name} Tasks</h2>
                <ul className="task-list">
                  {project.tasks.map((task, taskIndex) => (
                    <li key={taskIndex}>
                      <span>{task.name}</span>
                      <span className="assignee">Assigned to: {task.assignee}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {activeTab === "resources" && (
          <div className="resources-tab">
            <div className="card">
              <h2>Add New Resource</h2>
              <select
                value={newResource.projectIndex}
                onChange={(e) => setNewResource({ ...newResource, projectIndex: parseInt(e.target.value) })}
              >
                {projects.map((project, index) => (
                  <option key={index} value={index}>
                    {project.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Resource Name"
                value={newResource.name}
                onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newResource.quantity}
                onChange={(e) => setNewResource({ ...newResource, quantity: parseInt(e.target.value) })}
              />
              <button className="btn" onClick={addResource}>Add Resource</button>
            </div>
            {projects.map((project, projectIndex) => (
              <div key={projectIndex} className="card">
                <h2>{project.name} Resources</h2>
                <ul className="resource-list">
                  {project.resources.map((resource, resourceIndex) => (
                    <li key={resourceIndex}>
                      <span>{resource.name}</span>
                      <span className="quantity">Quantity: {resource.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        .dashboard-container {
          font-family: Arial, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .dashboard-title {
          color: #232F4B;
          font-size: 28px;
          margin-bottom: 20px;
        }

        .tabs {
          display: flex;
          margin-bottom: 20px;
        }

        .tab {
          background-color: #fff;
          color: #232F4B;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab:hover, .tab.active {
          color: #FD7E14;
          border-bottom: 3.5px solid #FD7E14;
        }

        .card {
          background-color: #fff;
          border-radius: 6px;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
          padding: 20px;
          margin-bottom: 20px;
        }

        .card h2 {
          color: #232F4B;
          font-size: 20px;
          margin-bottom: 15px;
        }

        input, select {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .btn {
          background: linear-gradient(270deg, rgba(239, 95, 52, .75), #E34212);
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .btn:hover {
          background: linear-gradient(270deg, #E34212, rgba(239, 95, 52, .75));
        }

        .progress-container {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .progress-container input {
          width: 60px;
          margin-left: 10px;
        }

        .progress-bar {
          background-color: #C9F0EB;
          height: 20px;
          border-radius: 10px;
          overflow: hidden;
        }

        .progress {
          background-color: #FD7E14;
          height: 100%;
          transition: width 0.3s ease;
        }

        .volunteers {
          display: flex;
          align-items: center;
          margin-top: 10px;
        }

        .btn-icon {
          background: none;
          border: none;
          cursor: pointer;
          margin-left: 10px;
          color: #232F4B;
        }

        .btn-icon:hover {
          color: #FD7E14;
        }

        .task-list, .resource-list {
          list-style-type: none;
          padding: 0;
        }

        .task-list li, .resource-list li {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .assignee, .quantity {
          color: #666;
          font-size: 14px;
        }

        @media screen and (max-width: 768px) {
          .tabs {
            flex-direction: column;
          }

          .tab {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </div>
  )
}