import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

export default function Dashboard() {

  // ================= STATES =================

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [projectName, setProjectName] = useState("");

  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  // ================= LOAD ATTENDANCE =================

  useEffect(() => {

    const fetchAttendance = async () => {

      try {

        const res = await API.get("/attendance/today");

        if (res.data) {

          if (res.data.punchIn && !res.data.punchOut) {

            setRunning(true);

            const start = new Date(res.data.punchIn);

            setTime(
              Math.floor((new Date() - start) / 1000)
            );
          }

          if (res.data.punchOut) {

            const start = new Date(res.data.punchIn);

            const end = new Date(res.data.punchOut);

            setTime(
              Math.floor((end - start) / 1000)
            );
          }
        }

      } catch (err) {

        console.log(err);

      }
    };

    fetchAttendance();

  }, []);

  // ================= TIMER =================

  useEffect(() => {

    let interval;

    if (running) {

      interval = setInterval(() => {

        setTime((prev) => prev + 1);

      }, 1000);
    }

    return () => clearInterval(interval);

  }, [running]);

  // ================= FORMAT TIME =================

  const formatTime = () => {

    const hrs = String(
      Math.floor(time / 3600)
    ).padStart(2, "0");

    const mins = String(
      Math.floor((time % 3600) / 60)
    ).padStart(2, "0");

    const secs = String(
      time % 60
    ).padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;
  };

  // ================= LOAD DATA =================

  useEffect(() => {

    fetchProjects();
    fetchTasks();
    fetchUsers();

  }, []);

  // ================= FETCH PROJECTS =================

  const fetchProjects = async () => {

    try {

      const res = await API.get("/projects");

      setProjects(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  // ================= FETCH USERS =================

  const fetchUsers = async () => {

    try {

      const res = await API.get("/auth/users");

      setMembers(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  // ================= FETCH TASKS =================

  const fetchTasks = async () => {

    try {

      const res = await API.get("/tasks");

      setTasks(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  // ================= CREATE PROJECT =================

  const handleCreateProject = async () => {

    if (!projectName) {

      alert("Project name required");

      return;
    }

    try {

      await API.post("/projects", {
        name: projectName,
      });

      setProjectName("");

      fetchProjects();

      alert("Project created");

    } catch (err) {

      alert("Project creation failed");

    }
  };

  // ================= DELETE PROJECT =================

  const handleDeleteProject = async (id) => {

    try {

      await API.delete(`/projects/${id}`);

      fetchProjects();

      alert("Project deleted");

    } catch (err) {

      alert("Delete failed");

    }
  };

  // ================= CREATE TASK =================

  const handleCreateTask = async () => {

    if (!title || !projectId || !assignedTo) {

      alert("All fields required");

      return;
    }

    try {

      await API.post("/tasks", {

        title,
        projectId,
        user: assignedTo,

      });

      setTitle("");
      setProjectId("");
      setAssignedTo("");

      fetchTasks();

      alert("Task created");

    } catch (err) {

      alert("Task creation failed");

    }
  };

  // ================= UPDATE STATUS =================

  const updateStatus = async (id, status) => {

    try {

      await API.put(`/tasks/${id}`, {
        status,
      });

      fetchTasks();

    } catch (err) {

      console.log(err);

    }
  };

  // ================= PUNCH IN =================

  const handlePunchIn = async () => {

    try {

      await API.post("/attendance/punch-in");

      setRunning(true);

      setTime(0);

    } catch (err) {

      alert(
        err.response?.data?.msg || "Punch In failed"
      );
    }
  };

  // ================= PUNCH OUT =================

  const handlePunchOut = async () => {

    try {

      await API.post("/attendance/punch-out");

      setRunning(false);

    } catch (err) {

      alert(
        err.response?.data?.msg || "Punch Out failed"
      );
    }
  };

  // ================= STATUS COLOR =================

  const getColor = (status) => {

    if (status === "done")
      return "bg-green-500";

    if (status === "in-progress")
      return "bg-yellow-500";

    return "bg-gray-600";
  };

  // ================= UI =================

  return (

    <Layout>

      {/* TIMER */}

      <div className="bg-gray-800 p-5 rounded mb-5 flex justify-between items-center">

        <h2 className="text-3xl font-mono text-white">
          {formatTime()}
        </h2>

        {!running ? (

          <button
            onClick={handlePunchIn}
            className="bg-green-500 px-5 py-2 rounded text-white"
          >
            Punch In
          </button>

        ) : (

          <button
            onClick={handlePunchOut}
            className="bg-red-500 px-5 py-2 rounded text-white"
          >
            Punch Out
          </button>

        )}

      </div>

      {/* CREATE PROJECT */}

      <div className="bg-gray-800 p-5 rounded mb-5">

        <h2 className="text-white mb-3 font-bold">
          Create Project
        </h2>

        <input
          value={projectName}
          onChange={(e) =>
            setProjectName(e.target.value)
          }
          placeholder="Project Name"
          className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
        />

        <button
          onClick={handleCreateProject}
          className="bg-blue-500 px-4 py-2 rounded text-white"
        >
          Create Project
        </button>

      </div>

      {/* PROJECT LIST */}

      <div className="bg-gray-800 p-5 rounded mb-5">

        <h2 className="text-white mb-3 font-bold">
          Projects
        </h2>

        {projects.map((p) => (

          <div
            key={p._id}
            className="flex justify-between items-center bg-gray-700 p-3 rounded mb-2"
          >

            <p className="text-white">
              {p.name}
            </p>

            <button
              onClick={() =>
                handleDeleteProject(p._id)
              }
              className="bg-red-500 px-3 py-1 rounded text-white"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

      {/* CREATE TASK */}

      <div className="bg-gray-800 p-5 rounded mb-5">

        <h2 className="text-white mb-3 font-bold">
          Create & Assign Task
        </h2>

        {/* TITLE */}

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
        />

        {/* PROJECT */}

        <select
          value={projectId}
          onChange={(e) =>
            setProjectId(e.target.value)
          }
          className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
        >

          <option value="">
            Select Project
          </option>

          {projects.map((p) => (

            <option
              key={p._id}
              value={p._id}
            >
              {p.name}
            </option>

          ))}

        </select>

        {/* USERS */}

        <select
          value={assignedTo}
          onChange={(e) =>
            setAssignedTo(e.target.value)
          }
          className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
        >

          <option value="">
            Assign To
          </option>

          {members.map((m) => (

            <option
              key={m._id}
              value={m._id}
            >
              {m.name}
            </option>

          ))}

        </select>

        <button
          onClick={handleCreateTask}
          className="bg-cyan-500 px-4 py-2 rounded text-white"
        >
          Create Task
        </button>

      </div>

      {/* TASK LIST */}

      <div className="bg-gray-800 p-5 rounded">

        <h2 className="text-white mb-3 font-bold">
          Tasks
        </h2>

        {tasks.length === 0 ? (

          <p className="text-gray-400">
            No tasks
          </p>

        ) : (

          tasks.map((task) => (

            <div
              key={task._id}
              className={`p-3 mb-2 rounded flex justify-between items-center ${getColor(task.status)}`}
            >

              <div>

                <p className="text-white font-semibold">
                  {task.title}
                </p>

                <p className="text-sm text-white">
                  Project:
                  {" "}
                  {task.projectId?.name || "N/A"}
                </p>

                <p className="text-sm text-white">
                  Assigned:
                  {" "}
                  {task.user?.name || "N/A"}
                </p>

              </div>

              <select
                value={task.status}
                onChange={(e) =>
                  updateStatus(
                    task._id,
                    e.target.value
                  )
                }
                className="bg-gray-900 text-white p-1 rounded"
              >

                <option value="todo">
                  Todo
                </option>

                <option value="in-progress">
                  In Progress
                </option>

                <option value="done">
                  Done
                </option>

              </select>

            </div>

          ))
        )}

      </div>

      {/* STATS */}

      <div className="text-white mt-5">

        Total Time:
        {" "}
        {Math.floor(time / 60)}
        {" "}
        mins

        <br />

        Total Tasks:
        {" "}
        {tasks.length}

      </div>

    </Layout>
  );
}