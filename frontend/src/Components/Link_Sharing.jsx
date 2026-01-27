import { useState } from "react";

export default function ShareLinkForm() {
  const [formState, setFormState] = useState({
    Link: "",
    Description :"",
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
    <form>
      <label class="form-label"> Link</label>
      <input
        type="text"
        class="form-control"
        placeholder="Link"
        name="Link"
        onChange={handleChange}
      />
      <label class="form-label"> Description </label>
      <textarea class="form-control"  rows="3"></textarea>
      <label class="form-label mt-2"> Topic </label>
      <select
        class="form-select"
        name="Topic"
        value={formState.visibility}
        onChange={handleChange}
      >
        <option value="Select Topic">Select Topic</option>
      </select>
      
    </form>
  );
}
