import React, { useState, useEffect } from "react";

const Message = ({ status, children }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {status === "error" && (
        <div className="alert alert-danger alert-dismissible fade show">
          <p>{children}</p>
        </div>
      )}

      {status === "success" && (
        <div className="alert alert-success alert-dismissible fade show">
          <p>{children}</p>
        </div>
      )}
    </>
  );
};

export default Message;
