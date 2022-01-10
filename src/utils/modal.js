// import Chart from "../components/Chart";

import "../styles/Modal.css";

function Modal({ children, trigger }) {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span onClick={() => trigger()} className="close">
            &times;
          </span>
          <h2>AIR QUALITY INDEX</h2>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
