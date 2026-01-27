import Navbar from "../Components/Navbar";
import Modals from "../Components/Modals"
import ShareLinkForm from "../Components/Link_Sharing"
import CreateTopic from "../Components/Create_Topic";
import ShareDocument from "../Components/Document_Sharing";
import SendInvite from "../Components/Send_Invite";
import { useState } from "react";


export default function Dashboard() {
  const [activeModal, setActiveModal] = useState(null)

  const closeModal = ()=>{
    setActiveModal(null)
  }
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
        {activeModal === "Link_Sharing" && <ShareLinkForm />}
        {activeModal === "Document_Sharing" && <ShareDocument />}
        {activeModal === "Send_Invite" && <SendInvite />}
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
                        <div class="mt-2 fs-4 fw-bold">12</div>
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
              <button class="btn btn-success" onClick={()=>{setActiveModal("Link_Sharing")}}>Share Link</button>
              <button class="btn btn-success" onClick={()=>{setActiveModal("Document_Sharing")}}>Share Document</button>
              <button class="btn btn-success" onClick={()=>{setActiveModal("Send_Invite")}}>Send Invite</button>
              <button class="btn btn-success" onClick={()=>{setActiveModal("Create_Topic")}}>Create Topic</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
