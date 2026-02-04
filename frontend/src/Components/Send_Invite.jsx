import { useState, useEffect } from "react";
import { SearchUsers } from "../Services/UserSearch.js";
import axios from "axios";

export default function SendInvite({ topics }) {
  const [results, setResults] = useState([]);
  const [formState, setFormState] = useState({
    topicId: "",
    selectedUsers: [],
    search: "",
  });

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!formState.search) {
        setResults([]);
        return;
      }

      const users = await SearchUsers(formState.search);
      setResults(users);
    }, 300);

    return () => clearInterval(delay);
  }, [formState.search]);

  const handleChange = (e) => {
    console.log("Editin Invite form");
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddUser = (user) => {
    if (formState.selectedUsers.some((u) => u._id === user._id)) return;

    setFormState((prev) => ({
      ...prev,
      selectedUsers: [...prev.selectedUsers, user],
      search: "",
    }));
  };

  const handleRemoveUser = (userId) => {
    setFormState((prev) => ({
      ...prev,
      selectedUsers: prev.selectedUsers.filter((u) => u._id !== userId),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formState.topicId || !formState.selectedUsers.length) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/invites/sendinvite",
        { topic: formState.topicId, users: formState.selectedUsers },
        { withCredentials: true },
      );
      alert(res.data.message);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="form-label">Invite Users</label>
      <input
        type="text"
        className="form-control"
        placeholder="Search by username"
        name="search"
        value={formState.search}
        onChange={handleChange}
      />

      {formState.search && (
        <div className="border rounded mt-1">
          {results.map((user) => (
            <div
              key={user._id}
              className="p-2 cursor-pointer hover-bg"
              onClick={() => handleAddUser(user)}
            >
              {user.username}
            </div>
          ))}
        </div>
      )}

      {formState.selectedUsers.length > 0 && (
        <div className="mt-2">
          {formState.selectedUsers.map((user) => (
            <span key={user._id} className="badge bg-primary me-2">
              {user.username}
              <button
                type="button"
                className="btn-close btn-close-white ms-2"
                onClick={() => handleRemoveUser(user._id)}
              />
            </span>
          ))}
        </div>
      )}

      <label className="form-label mt-3">Topic</label>
      <select
        className="form-select"
        name="topicId"
        value={formState.topicId}
        onChange={handleChange}
        required
      >
        <option value="">Select Topic</option>
        {topics.map((topic) => (
          <option key={topic._id} value={topic._id}>
            {topic.name}
          </option>
        ))}
      </select>

      <button className="btn btn-success mt-3 mx-auto d-block" type="submit">
        Send Invite
      </button>
    </form>
  );
}
