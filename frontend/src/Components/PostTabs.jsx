import PostPanel from "./PostPanel";

export default function PostsTabs({
  activeTab,
  setActiveTab,
  userDetails,
  handleSubscribe,
  posts,
  refresh,
  containerRef,
}) {
  return (
    <div
      className="dark-panel overflow-y-auto"
      style={{ height: "400px" }}
      ref={containerRef}
    >
      <ul className="nav nav-tabs mb-3 w-100 sticky-tabs">
        <li className="nav-item flex-fill">
          <button
            className={`nav-link ${
              activeTab === "recommended" ? "active" : ""
            }`}
            onClick={() => setActiveTab("recommended")}
          >
            Recommended
          </button>
        </li>

        <li className="nav-item flex-fill">
          <button
            className={`nav-link ${activeTab === "popular" ? "active" : ""}`}
            onClick={() => setActiveTab("popular")}
          >
            Top Posts
          </button>
        </li>

        <li className="nav-item flex-fill">
          <button
            className={`nav-link ${activeTab === "feed" ? "active" : ""}`}
            onClick={() => setActiveTab("feed")}
          >
            Your Feed
          </button>
        </li>
        <div>
          <button
            onClick={refresh}
            className="btn btn-success round-pill mt-2 mb-2 sticky-tabs"
          >
            Refresh Posts
          </button>
        </div>
      </ul>

      {/* ===== TAB CONTENT ===== */}

      {activeTab === "recommended" && (
        <PostPanel
          posts={posts}
          userDetails={userDetails}
          handleSubscribe={handleSubscribe}
        />
      )}

      {activeTab === "popular" && (
        <PostPanel
          posts={posts}
          userDetails={userDetails}
          handleSubscribe={handleSubscribe}
        />
      )}

      {activeTab === "feed" && (
        <PostPanel
          posts={posts}
          userDetails={userDetails}
          handleSubscribe={handleSubscribe}
        />
      )}
    </div>
  );
}
