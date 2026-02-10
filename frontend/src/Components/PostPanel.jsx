import FileCard from "./FileCard";
import { NavLink } from "react-router-dom";
import PostRating from "./PostRating";

export default function PostsPanel({ posts, handleSubscribe, handleRate }) {
  return (
    <div className="d-flex flex-column gap-3">
      {posts.map((post) => (
        <div className="card dark-card" key={post._id}>
          <div className="card-header dark-card-header">{post.topic.name}</div>

          <div className="card-body">
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
                    {post.createdBy?.firstname || "Firstname"}{" "}
                    {post.createdBy?.lastname || "Lastname"}
                  </h6>

                  <small className="text-muted">
                    @{post.createdBy?.username || "username"}
                  </small>
                </div>
              </div>

              <button
                className={`btn ${post.isSubscribed ? "btn-danger" : "btn-success"} rounded-pill`}
                onClick={() => {
                  handleSubscribe(post);
                }}
              >
                {post.isSubscribed ? "Unsubscribe" : "Subscribe"}
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
            <div className="d-flex align-items-center">
              <h5 className="mb-0 me-2">Rating:</h5>
              <PostRating post={post} handleRate={handleRate} />
            </div>

            <NavLink to="/post" className="btn btn-primary w-100 mt-2">
              View Post
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
}
