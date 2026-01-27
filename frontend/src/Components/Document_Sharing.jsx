import { useState } from "react";

export default function ShareDocument() {
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
              setregisterForm((prev) => ({
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
            name = "Description"
          ></textarea>

          <select
            class="form-select"
            name="Topic"
            value={formState.visibility}
            onChange={handleChange}
          >
            <option value="Select Topic">Select Topic</option>
          </select>
      </form>
    </>
  );
}
