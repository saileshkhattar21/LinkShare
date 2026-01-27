import { useState } from "react";

export default function ShareDocument({ topics }) {
  const [formState, setFormState] = useState({
    Document: null,
    Description: "",
    Topic: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <form>
        <label class="form-label">Document</label>
        <div class="d-flex">
          <input
            type="file"
            class="form-control"
            name="Document"
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                photo: e.target.files[0],
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
          name="topicId"
          value={formState.topicId}
          onChange={handleChange}
        >
          <option value="">Select Topic</option>

          {topics.map((topic) => (
            <option key={topic._id} value={topic.name}>
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
