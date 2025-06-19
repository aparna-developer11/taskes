import { useState, useRef, useEffect } from "react";
import {
  Bell,
  LayoutDashboard,
  ListTodo,
  CircleHelp,
  LogOut,
  CornerUpLeft,
  FilePlus,
  Trash2,
  Pencil,
  Save,
  X,
  Users,
  Menu,
} from "lucide-react";
import ButtonMedium from "../Components/ButtonMedium";
import { ButtonSmall } from "../Components/ButtonSmall";
import { ButtonLarge } from "../Components/ButtonLarge";
import DonutChart from "../Components/DonutChart";
import "../Css/dashboard.css";
import "../Css/ButtonLarge.css";
import Banner from "../assets/banner.gif";

const Dashboard = ({ user, onLogout }) => {
  const now = new Date();
  const day = now.toLocaleDateString(undefined, { weekday: "long" });
  const date = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const formattedDate = `${date}/${month}/${year}`;

  const Title = useRef();
  const taskDate = useRef();
  const Descrip = useRef();

  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const isValid =
      Title.current?.value.trim() &&
      taskDate.current?.value.trim() &&
      Descrip.current?.value.trim();

    setIsFormValid(Boolean(isValid));
  };

  const [activePage, setActivePage] = useState("Dashboard");
  const [notifi, setnotifi] = useState(false);
  // const [calen, setCalen] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const filterStatus = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [Task, setTask] = useState(() => {
    const saved = localStorage.getItem("taskList");
    return JSON.parse(saved) || [];
  });

  // New state for editing tasks
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    Title: "",
    Date: "",
    Description: "",
    Status: "",
  });

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(Task));
  }, [Task]);

  const handleSave = () => {
    const TaskTitle = Title.current.value;
    const TaskDate = taskDate.current.value;
    const Description = Descrip.current.value;

    if (TaskTitle && TaskDate && Description) {
      const newTask = {
        Title: TaskTitle,
        Date: TaskDate,
        Description: Description,
        Status: "Not Started",
      };
      setTask([...Task, newTask]);
      setAddTask(false);
      // Clear form
      Title.current.value = "";
      taskDate.current.value = "";
      Descrip.current.value = "";
    } else {
      alert("Please fill all fields");
    }
  };

  const handleDelete = (index) => {
    const updatedTasks = [...Task];
    updatedTasks.splice(index, 1);
    setTask(updatedTasks);
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const filteredTasks = Task.filter(
    (task) =>
      task.Title.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  const handleEditClick = (index) => {
    const task = Task[index];
    setEditingIndex(index);
    setEditForm({ ...task });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = () => {
    if (editForm.Title && editForm.Date && editForm.Description) {
      const updatedTasks = [...Task];
      updatedTasks[editingIndex] = { ...editForm };
      setTask(updatedTasks);
      setEditingIndex(null);
    } else {
      alert("Please fill all fields");
    }
  };

  const renderPageContent = () => {
    switch (activePage) {
      case "Dashboard": {
        const totalTasks = Task.length;
        const notStartedCount = Task.filter(
          (t) => t.Status === "Not Started"
        ).length;
        const inProgressCount = Task.filter(
          (t) => t.Status === "In Progress"
        ).length;
        const completedCount = Task.filter(
          (t) => t.Status === "Completed"
        ).length;

        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h1 className="welcome-text mb-4">Hello, {user.name} 🖐️</h1>
              </div>
            </div>

            <div className="row">
              {/* Charts Section */}
              <div className="col-12 col-lg-8 mb-4">
                <div className="row">
                  <div className="col-12 col-md-4 mb-3">
                    <div className="card shadow-sm">
                      <div className="card-body text-center">
                        <DonutChart
                          data={[
                            { name: "Not Started", value: notStartedCount },
                            {
                              name: "Other",
                              value: totalTasks - notStartedCount,
                            },
                          ]}
                          title="Not Started"
                          color="#FF6767"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 mb-3">
                    <div className="card shadow-sm">
                      <div className="card-body text-center">
                        <DonutChart
                          data={[
                            { name: "In Progress", value: inProgressCount },
                            {
                              name: "Other",
                              value: totalTasks - inProgressCount,
                            },
                          ]}
                          title="In Progress"
                          color="#FFC300"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 mb-3">
                    <div className="card shadow-sm">
                      <div className="card-body text-center">
                        <DonutChart
                          data={[
                            { name: "Completed", value: completedCount },
                            {
                              name: "Other",
                              value: totalTasks - completedCount,
                            },
                          ]}
                          title="Completed"
                          color="#28A745"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Banner Section */}
              <div className="col-12 col-lg-4 mb-4">
                <div className="card h-100">
                  <img
                    src={Banner || "/placeholder.svg"}
                    className="card-img-top h-100"
                    style={{ objectFit: "cover" }}
                    alt="Banner"
                  />
                </div>
              </div>
            </div>

            {/* In Progress Tasks */}
            <div className="row">
              <div className="col-12">
                <div className="card shadow-sm">
                  <div className="card-header bg-white">
                    <h2 className="mb-0">In Progress Tasks</h2>
                  </div>
                  <div
                    className="card-body"
                    style={{ maxHeight: "400px", overflowY: "auto" }}
                  >
                    <div className="row">
                      {Task.filter((t) => t.Status === "In Progress").map(
                        (item, index) => (
                          <div
                            key={index}
                            className="col-12 col-md-6 col-lg-4 mb-3"
                          >
                            <div className="card border-0 shadow-sm">
                              <div className="card-body">
                                <h5 className="card-title">{item.Title}</h5>
                                <p className="card-text">{item.Description}</p>
                                <p className="card-text">
                                  <small className="text-muted">
                                    <strong>Date:</strong> {item.Date}
                                  </small>
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                      {Task.filter((t) => t.Status === "In Progress").length ===
                        0 && (
                        <div className="col-12 text-center text-muted">
                          <p>No tasks in progress</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case "My tasks": {
        return (
          <div className="container-fluid">
            {/* Search and Add Task Header */}
            <div className="row mb-4">
              <div className="col-12 col-md-6 mb-2 mb-md-0">
                <input
                  type="search"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-12 col-md-6 text-md-end">
                <button
                  className="btn btn-outline-danger d-flex align-items-center gap-2 ms-auto"
                  onClick={() => setAddTask(true)}
                >
                  <FilePlus size={16} /> Create New Task
                </button>
              </div>
            </div>

            {/* Task Columns */}
            <div className="row">
              {["Not Started", "In Progress", "Completed"].map((status) => (
                <div key={status} className="col-12 col-lg-4 mb-4">
                  <div className="card h-100">
                    <div className="card-header bg-light">
                      <h5 className="mb-0 text-center">{status}</h5>
                    </div>
                    <div
                      className="card-body"
                      style={{ maxHeight: "70vh", overflowY: "auto" }}
                    >
                      {filteredTasks
                        .filter((item) => item.Status === status)
                        .map((item, index) => {
                          const actualIndex = Task.findIndex((t) => t === item);
                          return (
                            <div
                              key={actualIndex}
                              className="card mb-3 shadow-sm"
                            >
                              <div className="card-body">
                                {editingIndex === actualIndex ? (
                                  <div>
                                    <input
                                      type="text"
                                      name="Title"
                                      value={editForm.Title}
                                      onChange={handleEditChange}
                                      className="form-control mb-2"
                                      placeholder="Task title"
                                    />
                                    <textarea
                                      name="Description"
                                      value={editForm.Description}
                                      onChange={handleEditChange}
                                      rows={3}
                                      className="form-control mb-2"
                                      placeholder="Task description"
                                    />
                                    <input
                                      type="date"
                                      name="Date"
                                      value={editForm.Date}
                                      onChange={handleEditChange}
                                      className="form-control mb-2"
                                    />
                                    <select
                                      name="Status"
                                      value={editForm.Status}
                                      onChange={handleEditChange}
                                      className="form-select mb-2"
                                    >
                                      <option value="Not Started">
                                        Not Started
                                      </option>
                                      <option value="In Progress">
                                        In Progress
                                      </option>
                                      <option value="Completed">
                                        Completed
                                      </option>
                                    </select>
                                    <div className="d-flex justify-content-between">
                                      <button
                                        onClick={handleEditSave}
                                        className="btn btn-sm btn-outline-success"
                                      >
                                        <Save size={16} />
                                      </button>
                                      <button
                                        onClick={handleCancelEdit}
                                        className="btn btn-sm btn-outline-secondary"
                                      >
                                        <X size={16} />
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <h6 className="card-title">{item.Title}</h6>
                                    <p className="card-text small">
                                      {item.Description}
                                    </p>
                                    <p className="card-text">
                                      <small className="text-muted">
                                        <strong>Date:</strong> {item.Date}
                                      </small>
                                    </p>
                                    <div className="d-flex justify-content-between">
                                      <button
                                        onClick={() =>
                                          handleDelete(actualIndex)
                                        }
                                        className="btn btn-sm btn-outline-danger"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleEditClick(actualIndex)
                                        }
                                        className="btn btn-sm btn-outline-primary"
                                      >
                                        <Pencil size={16} />
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      {filteredTasks.filter((item) => item.Status === status)
                        .length === 0 && (
                        <div className="text-center text-muted">
                          <p>No {status.toLowerCase()} tasks</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case "Settings":
        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h1 className="welcome-text mb-4">About Us 📋</h1>
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      <strong>ToDo App</strong> is a simple task management tool
                      designed to help you stay organized. Whether it's your
                      daily chores or work assignments, this app makes tracking
                      tasks effortless.
                    </p>
                    <h5 className="card-title mt-4">Features</h5>
                    <ul className="list-unstyled">
                      <li>✓ Add, edit, and delete tasks</li>
                      <li>✓ Mark tasks as completed or pending</li>
                      <li>✓ Set due dates</li>
                      <li>✓ Filter tasks by status</li>
                      <li>✓ Data saved in localStorage</li>
                    </ul>
                    <h5 className="card-title mt-4">Why Use This App?</h5>
                    <p className="card-text">
                      It's easy to use, fast, and built to help you focus on
                      what matters most: getting things done.
                    </p>
                    <p className="text-muted fst-italic mt-4">
                      Focus. Organize. Accomplish.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "Help":
        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h1 className="welcome-text mb-4">Help & Support 🤝</h1>
                <div className="card">
                  <div
                    className="card-body"
                    style={{ maxHeight: "70vh", overflowY: "auto" }}
                  >
                    <p className="card-text">
                      Welcome to the <strong>ToDo App Help Page</strong>. If
                      you're new or need guidance, this page explains how to use
                      the app and answers common questions.
                    </p>

                    <h5 className="mt-4">📝 How to Add a Task</h5>
                    <p>
                      Type your task in the input field and click the{" "}
                      <strong>Add</strong> button. Your task will appear in the
                      list.
                    </p>

                    <h5 className="mt-4">✅ How to Complete a Task</h5>
                    <p>
                      Click on the checkbox next to the task to mark it as
                      completed. Completed tasks may appear with a
                      strike-through.
                    </p>

                    <h5 className="mt-4">🗑️ How to Delete a Task</h5>
                    <p>
                      Click the <strong>Delete</strong> button (🗑️ icon) beside
                      a task to remove it from your list permanently.
                    </p>

                    <h5 className="mt-4">📅 Using Due Dates</h5>
                    <p>
                      Some versions support date selection. Use the calendar to
                      assign a due date while adding or editing a task.
                    </p>

                    <h5 className="mt-4">💾 Where is My Data Stored?</h5>
                    <p>
                      All your tasks are saved in your browser's localStorage.
                      Clearing your browser data may remove them.
                    </p>

                    <h5 className="mt-4">❓Need More Help?</h5>
                    <p>
                      If you're stuck or have feedback, reach out to our
                      developer team at <strong>support@todoapp.com</strong>.
                    </p>

                    <p className="text-muted fst-italic mt-4">
                      We're here to help you stay organized. 😊
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <header className="bg-white shadow-sm py-3">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* Mobile Menu Button */}
            <div className="col-auto d-lg-none">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu size={20} />
              </button>
            </div>

            {/* Logo */}
            <div className="col-auto">
              <h2 className="mb-0">
                <span style={{ color: "#FF6767" }}>
                  {activePage === "Dashboard" ? "Dash" : "To"}
                </span>
                <span style={{ color: "#000" }}>
                  {activePage === "Dashboard" ? "Board" : "-Do"}
                </span>
              </h2>
            </div>

            {/* Spacer */}
            <div className="col"></div>

            {/* Notification Icons */}
            <div className="col-auto">
              <div className="d-flex gap-2">
                <ButtonSmall
                  name={<Bell />}
                  onClick={() => {
                    setnotifi(!notifi);
                  }}
                />
              </div>
            </div>

            {/* Date */}
            <div className="col-auto d-none d-md-block">
              <div className="text-end">
                <div className="fw-bold text-dark">{day}</div>
                <div className="text-primary">{formattedDate}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Dropdown */}
      {notifi && (
        <div
          className="position-fixed"
          style={{ top: "80px", right: "20px", zIndex: 1050, width: "300px" }}
        >
          <div className="card shadow">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="mb-0">Notifications</h6>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setnotifi(false)}
              >
                <CornerUpLeft size={16} />
              </button>
            </div>
            <div
              className="card-body"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {Task.filter((s) => s.Status === "Completed").map(
                (value, ind) => (
                  <div key={ind} className="mb-2 pb-2 border-bottom">
                    <h6 className="mb-1">{value.Title}</h6>
                    <small className="text-success">Completed</small>
                  </div>
                )
              )}
              {Task.filter((s) => s.Status === "Completed").length === 0 && (
                <p className="text-muted text-center">No completed tasks</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {addTask && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Task</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setAddTask(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Task Title"
                    ref={Title}
                    onChange={validateForm}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    ref={taskDate}
                    onChange={validateForm}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Enter Task Description"
                    ref={Descrip}
                    onChange={validateForm}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setAddTask(false)}
                >
                  Cancel
                </button>
                <ButtonMedium
                  btnName="Save"
                  onClick={handleSave}
                  disabled={!isFormValid}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container-fluid">
        <div className="row">
          {/* Desktop Sidebar */}
          <div className="col-lg-2 p-0 d-none d-lg-block">
            <div
              className="bg-custom-red text-white min-vh-100 p-3"
              style={{ marginTop: "-1px" }}
            >
              <nav className="d-flex flex-column gap-2">
                <ButtonLarge
                  class={
                    activePage === "Dashboard"
                      ? "nav-button active"
                      : "nav-button"
                  }
                  icon={<LayoutDashboard />}
                  name="Dashboard"
                  onClick={() => setActivePage("Dashboard")}
                />
                <ButtonLarge
                  class={
                    activePage === "My tasks"
                      ? "nav-button active"
                      : "nav-button"
                  }
                  icon={<ListTodo />}
                  name="My tasks"
                  onClick={() => setActivePage("My tasks")}
                />
                <ButtonLarge
                  class={
                    activePage === "Settings"
                      ? "nav-button active"
                      : "nav-button"
                  }
                  icon={<Users />}
                  name="About"
                  onClick={() => setActivePage("Settings")}
                />
                <ButtonLarge
                  class={
                    activePage === "Help" ? "nav-button active" : "nav-button"
                  }
                  icon={<CircleHelp />}
                  name="Help"
                  onClick={() => setActivePage("Help")}
                />
              </nav>
              <div className="mt-auto pt-4">
                <ButtonLarge
                  class="nav-button"
                  icon={<LogOut />}
                  name="Logout"
                  onClick={onLogout}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-10">
            <div className="p-3 p-md-4">{renderPageContent()}</div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          {/* Overlay */}
          {/* <div
            className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1045 }}
            onClick={() => setSidebarOpen(false)}
          ></div> */}

          {/* Mobile Sidebar Content */}
          <div
            className="position-fixed top-0 start-0 h-100 d-lg-none bg-custom-red text-white p-3"
            style={{
              width: "280px",
              zIndex: 1050,
              transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0 text-white">Menu</h4>
              <button
                className="btn btn-sm btn-outline-light"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <nav className="d-flex flex-column gap-2">
              <ButtonLarge
                class={
                  activePage === "Dashboard"
                    ? "nav-button active"
                    : "nav-button"
                }
                icon={<LayoutDashboard />}
                name="Dashboard"
                onClick={() => {
                  setActivePage("Dashboard");
                  setSidebarOpen(false);
                }}
              />
              <ButtonLarge
                class={
                  activePage === "My tasks" ? "nav-button active" : "nav-button"
                }
                icon={<ListTodo />}
                name="My tasks"
                onClick={() => {
                  setActivePage("My tasks");
                  setSidebarOpen(false);
                }}
              />
              <ButtonLarge
                class={
                  activePage === "Settings" ? "nav-button active" : "nav-button"
                }
                icon={<Users />}
                name="About"
                onClick={() => {
                  setActivePage("Settings");
                  setSidebarOpen(false);
                }}
              />
              <ButtonLarge
                class={
                  activePage === "Help" ? "nav-button active" : "nav-button"
                }
                icon={<CircleHelp />}
                name="Help"
                onClick={() => {
                  setActivePage("Help");
                  setSidebarOpen(false);
                }}
              />
            </nav>
            <div className="mt-auto pt-4">
              <ButtonLarge
                class="nav-button"
                icon={<LogOut />}
                name="Logout"
                onClick={() => {
                  onLogout();
                  setSidebarOpen(false);
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
