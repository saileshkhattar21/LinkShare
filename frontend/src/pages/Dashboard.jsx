import Modals from "../Components/Modals";
import ShareLinkForm from "../Components/Link_Sharing";
import CreateTopic from "../Components/Create_Topic";
import ShareDocument from "../Components/Document_Sharing";
import SendInvite from "../Components/Send_Invite";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { usePosts } from "../Hooks/usePosts.js";
import PostsTabs from "../Components/PostTabs";
import "../app.css";

export default function Dashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const [topics, setTopics] = useState([]);
  const [invites, setInvites] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("recommended");
  const [loading, setLoading] = useState(false);

  const containerRef = useRef(null);

  const scrollRef = useRef({
    recommended: 0,
    feed: 0,
    popular: 0,
  });

  const recommended = usePosts({
    type: "recommended",
    enabled: activeTab === "recommended",
  });

  const feed = usePosts({
    type: "feed",
    enabled: activeTab === "feed",
  });

  const popular = usePosts({
    type: "popular",
    enabled: activeTab === "popular",
  });

  const handleTabChange = (tab) => {
    if (containerRef.current) {
      console.log("Saving scroll:", containerRef.current.scrollTop);

      scrollRef.current[activeTab] = containerRef.current.scrollTop;
    }

    setActiveTab(tab);
  };
  useEffect(() => {
    if (containerRef.current) {
      console.log("Restoring scroll:", scrollRef.current[activeTab]);

      containerRef.current.scrollTop = scrollRef.current[activeTab] || 0;
    }
  }, [activeTab]);

  const currentTabData = {
    recommended,
    feed,
    popular,
  }[activeTab];

  const handleRate = async (resource, rating) => {
    try {
      await axios.post(
        "http://localhost:5000/api/rating/userrating",
        { resource, rating },
        { withCredentials: true },
      );

      currentTabData.refetch();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function fetchTopics() {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/topics/all", {
          withCredentials: true,
        });
        setTopics(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTopics();
  }, []);

  useEffect(() => {
    async function fetchInvites() {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:5000/api/invites/getinvites",
          { withCredentials: true },
        );
        setInvites(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchInvites();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:5000/api/users/getuserdetails",
          { withCredentials: true },
        );
        console.log(res.data);
        setUserDetails(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  /* ================= ACTIONS ================= */

  const closeModal = () => setActiveModal(null);

  const handleAccept = async (invite) => {
    const res = await axios.post(
      "http://localhost:5000/api/invites/acceptinvite",
      { invite },
      { withCredentials: true },
    );
    alert(res.data.message);
  };

  const handleReject = async (invite) => {
    const res = await axios.post(
      "http://localhost:5000/api/invites/rejectinvite",
      { invite },
      { withCredentials: true },
    );
    alert(res.data.message);
  };

  const handleSubscribe = async (post) => {
    if (post.isSubscribed) {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/subscribers/deletesubscription",
          { topicId: post.topic._id },
          { withCredentials: true },
        );
        alert(res.data.message);
        return;
      } catch (err) {
        alert(err);
        return;
      }
    } else {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/subscribers/newsubscription",
          { topicId: post.topic._id },
          { withCredentials: true },
        );
        alert(res.data.message);
      } catch (err) {
        alert(err);
      }
    }
  };

  /* ================= UI ================= */

  return (
    <>
      <Modals
        show={activeModal !== null}
        title={
          activeModal === "Link_Sharing"
            ? "Share Link"
            : activeModal === "Document_Sharing"
              ? "Share Document"
              : activeModal === "Send_Invite"
                ? "Send Invite"
                : "Create Topic"
        }
        onClose={closeModal}
      >
        {activeModal === "Link_Sharing" && <ShareLinkForm topics={topics} />}
        {activeModal === "Document_Sharing" && (
          <ShareDocument topics={topics} />
        )}
        {activeModal === "Send_Invite" && <SendInvite topics={topics} />}
        {activeModal === "Create_Topic" && <CreateTopic />}
      </Modals>

      <div className="app-root p-3">
        <div className="container dark-container p-3">
          <div class="d-flex flex-column justify-content-center align-items-center w-100">
            <h1 className="display-3">Welcome To</h1>
            <h3 className="display-5">Linkshare</h3>
            <h7 className="display-9 mb-3 ">Share,Subscribe and Discuss!!!!</h7>
          </div>

          <div class="d-flex justify-content-evenly dark-panel gap-2 p-3 mb-2">
            <button
              className="btn btn-success w-25 rounded-pill"
              onClick={() => setActiveModal("Link_Sharing")}
            >
              Share Link
            </button>

            <button
              className="btn btn-success w-25 rounded-pill"
              onClick={() => setActiveModal("Document_Sharing")}
            >
              Share Document
            </button>

            <button
              className="btn btn-success w-25 rounded-pill"
              onClick={() => setActiveModal("Send_Invite")}
            >
              Send Invite
            </button>

            <button
              className="btn btn-success w-25 rounded-pill"
              onClick={() => setActiveModal("Create_Topic")}
            >
              Create Topic
            </button>
          </div>
          <div className="row p-2">
            {/* LEFT SIDE */}

            <div className="col-6 d-flex flex-column gap-4">
              {/* USER DETAILS PANEL */}

              <div className="dark-panel">
                <h5 className="mb-3">
                  Welcome Back,{" "}
                  {userDetails ? userDetails[0].username : "username"}
                </h5>

                <div className="d-flex align-items-center gap-4">
                  {/* Avatar */}
                  <img
                    src="/default-user.png"
                    alt="User"
                    width="90"
                    height="90"
                    className="rounded-circle border border-secondary"
                    style={{ objectFit: "cover" }}
                  />

                  {/* User Info */}
                  <div className="flex-grow-1">
                    {/* Full Name */}
                    <h5>
                      {userDetails ? userDetails[0].firstname : "Firstname"}{" "}
                      {userDetails ? userDetails[0].lastname : "Lastname"}
                    </h5>

                    {/* Username */}
                    <small>
                      @{userDetails ? userDetails[0].username : "username"}
                    </small>

                    {/* Stats */}
                    <div className="d-flex justify-content-evenly text-center mt-2">
                      <div>
                        <small>Topics Added</small>
                        <div className="fs-4 fw-bold">{topics.length}</div>
                      </div>

                      <div>
                        <small>Subscribed</small>
                        <div className="fs-4 fw-bold">8</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RECENT POSTS PANEL */}

              <PostsTabs
                activeTab={activeTab}
                setActiveTab={handleTabChange}
                posts={currentTabData.posts}
                refresh={currentTabData.refresh}
                userDetails={userDetails}
                handleSubscribe={handleSubscribe}
                constainerRef={containerRef}
                handleRate={handleRate}
              />
            </div>

            {/* RIGHT SIDE */}

            <div className="col-6 d-flex flex-column gap-3">
              {/* ACTION BUTTONS */}

              <div
                className="dark-panel d-flex flex-column gap-2 overflow-y-auto"
                style={topics.length ? { height: "175px" } : {}}
              >
                <h5 className="mb-3 align-self-center">Your Topics!!!!</h5>
                <div className="d-flex flex-wrap gap-2">
                  {topics.map((topic, index) => {
                    const colours = [
                      "primary",
                      "success",
                      "danger",
                      "warning",
                      "info",
                      "secondary",
                    ];

                    const colour = colours[index % colours.length];

                    return (
                      <span
                        key={topic._id}
                        className={`badge rounded-pill bg-${colour} px-3 py-2 fs-6`}
                      >
                        {topic.name}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* INVITES PANEL */}

              <div
                className="dark-panel overflow-y-auto"
                style={invites.length ? { height: "300px" } : {}}
              >
                <h5 className="mb-3 align-self-center">Invites</h5>

                <div className="d-flex flex-column gap-3">
                  {invites.map((invite) => (
                    <div className="card dark-card" key={invite._id}>
                      <div className="card-header dark-card-header">
                        {invite.invitedUser}
                      </div>

                      <div className="card-body">
                        <h6>{invite.invitedBy}</h6>
                        <p>{invite.status}</p>
                      </div>

                      <div className="d-flex gap-2 p-3">
                        <button
                          className="btn btn-success w-50"
                          onClick={() => handleAccept(invite)}
                        >
                          Accept
                        </button>

                        <button
                          className="btn btn-danger w-50"
                          onClick={() => handleReject(invite)}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
