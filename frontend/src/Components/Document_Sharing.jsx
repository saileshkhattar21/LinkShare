import { useState } from "react";
import axios from "axios";

export default function ShareDocument({ topics }) {
  const [formState, setFormState] = useState({
    Document: null,
    Description: "",
    TopicID: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    console.log(formState);
    formData.append("document", formState.Document);
    formData.append("description", formState.Description);
    formData.append("topicID", formState.TopicID);
    formData.append("uploadType", "Document");
    for (const [key, value] of formData) {
      console.log(`${key}: ${value}`);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/resource/document/share",
        formData,
        { withCredentials: true },
      );

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label class="form-label">Document</label>
        <div class="d-flex">
          <input
            type="file"
            class="form-control"
            name="Document"
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                Document: e.target.files[0],
              }))
            }
          />
        </div>
        <label class="form-label"> Description </label>
        <textarea
          class="form-control"
          rows="3"
          onChange={handleChange}
          placeholder="Decription"
          name="Description"
        ></textarea>

        <select
          class="form-select"
          name="TopicID"
          value={formState.TopicID}
          onChange={handleChange}
        >
          <option value="">Select Topic</option>

          {topics.map((topic) => (
            <option key={topic._id} value={topic._id}>
              {topic.name}
            </option>
          ))}
        </select>
        <button class="btn btn-success mt-3 mx-auto d-block" type="submit">
          {" "}
          Share Document
        </button>
      </form>
    </>
  );
}
