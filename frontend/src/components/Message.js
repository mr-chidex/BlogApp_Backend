import React from "react";

const Message = ({ status, children, click }) => {
  return (
    <>
      {status === "error" && (
        <div className="alert alert-danger alert-dismissible fade show">
          <p>{children}</p>
          <button
            onClick={click}
            type="button"
            className="close"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}

      {status === "success" && (
        <div className="alert alert-success alert-dismissible fade show">
          <p>{children}</p>
          <button
            type="button"
            onClick={click}
            className="close"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </>
  );
};

export default Message;
