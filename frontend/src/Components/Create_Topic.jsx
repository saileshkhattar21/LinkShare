import { useState } from "react";
import axios from "axios";

export default function CreateTopic() {
  const [formState, setFormState] = useState({
    name: "",
    visibility: "Public",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log(formState);
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", formState.name);
    formData.append("visibility", formState.visibility);

    for (const [key, value] of formData) {
      console.log(`${key}: ${value}`);
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/topic/create",
        formData,
        { withCredentials: true },
      );

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form on onSubmit={handleSubmit}>
      <label class="form-label"> Name</label>
      <input
        type="text"
        class="form-control"
        placeholder="Topic Name"
        name="name"
        onChange={handleChange}
      />
      <label class="form-label mt-2"> Visibility </label>
      <select
        class="form-select"
        name="visibility"
        value={formState.visibility}
        onChange={handleChange}
      >
        <option value="Public">Public</option>
        <option value="Private">Private</option>
      </select>
      <button class="btn btn-success mb-3 mx-auto d-block" type="submit">
        Create Topic
      </button>
    </form>
  );
}
