import React from "react";
import ModalPage from "../../components/withModal";

function DeliverdOrder(props) {
  return (
    <>
      <div>DeliverdOrder</div>
      <button onClick={props.handleClose}>oooo</button>
    </>
  );
}

export default ModalPage(DeliverdOrder);
