




export default function Modal({ show, title, onClose, children }) {
  if (!show) return null;

  return (
    <>
      <div class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">

            <div class="modal-header">
              <h5 class="modal-title">{title}</h5>
              <button class="btn-close" onClick={onClose}></button>
            </div>

            <div class="modal-body">
              {children}
            </div>


          </div>
        </div>
      </div>

      <div class="modal-backdrop fade show"></div>
    </>
  );
}