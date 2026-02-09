import FileCard from "./FileCard";
import { NavLink } from "react-router-dom";

export default function PostsPanel({ posts, userDetails, handleSubscribe }) {
  return (
    <div className="d-flex flex-column gap-3">
      {posts.map((post) => (
        <div className="card dark-card" key={post._id}>
          <div className="card-header dark-card-header">{post.topic.name}</div>

          <div className="card-body">
            {/* HEADER */}
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <img
                  src="/default-user.png"
                  alt="User"
                  width="50"
                  height="50"
                  className="rounded-circle border border-secondary"
                  style={{ objectFit: "cover" }}
                />

                <div>
                  <h6 className="mb-0">
                    {userDetails?.[0]?.firstname || "Firstname"}{" "}
                    {userDetails?.[0]?.lastname || "Lastname"}
                  </h6>

                  <small className="text-muted">
                    @{userDetails?.[0]?.username || "username"}
                  </small>
                </div>
              </div>

              <button
                className="btn btn-success rounded-pill"
                onClick={() => handleSubscribe(post.topic._id)}
              >
                Subscribe
              </button>
            </div>

            {/* BODY */}

            <p className="mt-2">{post.description}</p>

            {post.type === "Document" ? (
              <FileCard
                fileName={post.content}
                filePath={`Uploads/${post.createdBy._id}/documents/${post.content}`}
              />
            ) : (
              <a href={post.url} target="_blank" rel="noreferrer">
                {post.url}
              </a>
            )}

            <NavLink to="/post" className="btn btn-primary w-100 mt-2">
              View Post
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
}
