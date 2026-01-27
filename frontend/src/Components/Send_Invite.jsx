import { useState } from "react";

export default function SendInvite() {
  const [formState, setFormState] = useState({
    email : "", 
    Topic : ""
  });

  const handleChange = (e)=>{
    const{name, value} = e.target;

    setFormState((prev)=>({
      ...prev, 
      [name] : value
    }))
  }
  return (
    <>
      <form>
        <lable class="form-label">Email</lable>
        <input
          type="email"
          name="email"
          onChange={HashChangeEvent}
          class="form-control"
          placeholde="Email"
        />

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
    </>
  );
}
