import Modals from "../Components/Modals";
import ShareLinkForm from "../Components/Link_Sharing";
import CreateTopic from "../Components/Create_Topic";
import ShareDocument from "../Components/Document_Sharing";
import SendInvite from "../Components/Send_Invite";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const [topics, setTopics] = useState([]);
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);

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
      console.log("AAAAAAAAAAAAAAA");
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:5000/api/invites/getinvites",
          {
            withCredentials: true,
          },
        );
        console.log("Invites=>>>>>>>", invites);
        setInvites(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchInvites();
    console.log(invites);
  }, []);

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleAccept = async (invite) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/invites/acceptinvite",
        { invite: invite },
        { withCredentials: true },
      );
      alert(res.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (invite) => {
    const res = await axios.post(
      "http://localhost:5000/api/invites/rejectinvite",
      { invite: invite },
      { withCredentials: true },
    );
    alert(res.data.message);
  };
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
      <div class="container bg-dark p-3 mt-2">
        <div class="row bg-light p-2">
          <div class="col-6 bg-dark pt-2 pb-2">
            <div class="card">
              <div class="card-header">User Details</div>

              <div class="card-body">
                <div class="d-flex align-items-start">
                  <img
                    src=""
                    class="rounded me-3"
                    alt="User"
                    width="100"
                    height="100"
                  />

                  <div>
                    <h5 class="card-title mb-1">User Name</h5>
                    <div class="row text-center">
                      <div class="col-6">
                        <h6>Topics Added</h6>
                        <div class="mt-2 fs-4 fw-bold">{topics.length}</div>
                      </div>

                      <div class="col-6">
                        <h6>Subscribed</h6>
                        <div class="mt-2 fs-4 fw-bold">8</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 bg-dark p-3">
            <div class="d-flex flex-column gap-2">
              <button
                class="btn btn-success"
                onClick={() => {
                  setActiveModal("Link_Sharing");
                }}
              >
                Share Link
              </button>
              <button
                class="btn btn-success"
                onClick={() => {
                  setActiveModal("Document_Sharing");
                }}
              >
                Share Document
              </button>
              <button
                class="btn btn-success"
                onClick={() => {
                  setActiveModal("Send_Invite");
                }}
              >
                Send Invite
              </button>
              <button
                class="btn btn-success"
                onClick={() => {
                  setActiveModal("Create_Topic");
                }}
              >
                Create Topic
              </button>
            </div>

            <div
              class="card mt-3 overflow-y-auto"
              style={invites.length !== 0 ? { height: "275px" } : {}}
            >
              <div class="card-header">Invites</div>
              <div class="card-body d-flex flex-column gap-3">
                {invites.map((invite) => (
                  <div className="card" key={invite._id}>
                    <div className="card-header">{invite.invitedUser}</div>
                    <div className="card-body">
                      <h5 className="card-title">{invite.invitedBy}</h5>
                      <p className="card-text">{invite.status}</p>
                    </div>
                    <div class="d-flex justify-content-evenly gap-2 p-3">
                      <button
                        class=" btn btn-success w-50"
                        onClick={() => {
                          handleAccept(invite);
                        }}
                      >
                        {" "}
                        Accept Invite{" "}
                      </button>
                      <button
                        class=" btn btn-danger w-50"
                        onClick={() => {
                          handleReject(invite);
                        }}
                      >
                        {" "}
                        Reject Invite{" "}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
