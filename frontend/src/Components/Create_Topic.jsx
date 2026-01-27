import { useState } from "react";

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
  return (
    <form>
      <label class="form-label"> Name</label>
      <input
        type="text"
        class="form-control"
        placeholder="Topic....."
        name="Topic"
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
      <button class="btn btn-success mt-3 mx-auto d-block">Create Topic</button>
    </form>
  );
}
