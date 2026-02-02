import { useState } from "react";
import axios from "axios";

export default function ShareLinkForm({ topics }) {
  const [formState, setFormState] = useState({
    Link: "",
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

  const handleLinkShare = async (e) => {
    e.preventDefault();

    try {
      console.log(formState);
      const res = await axios.post(
        "http://localhost:5000/api/resource/link/share",
        {
          link: formState.Link,
          description: formState.Description,
          topicID: formState.TopicID,
        },
        { withCredentials: true },
      );

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };
  return (
    <form onSubmit={handleLinkShare}>
      <label class="form-label"> Link</label>
      <input
        type="text"
        class="form-control"
        placeholder="Link"
        name="Link"
        onChange={handleChange}
      />
      <label class="form-label"> Description </label>
      <textarea
        class="form-control"
        rows="3"
        name="Description"
        onChange={handleChange}
      ></textarea>
      <label class="form-label mt-2"> Topic </label>
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
        Share Link
      </button>
    </form>
  );
}
