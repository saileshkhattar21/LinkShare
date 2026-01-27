import { useState } from "react";

export default function SendInvite({ topics }) {
  const [formState, setFormState] = useState({
    email: "",
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
          Send Invite
        </button>
      </form>
    </>
  );
}
