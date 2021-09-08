import React from "react";
import { CircleSpinner } from "react-spinners-kit";

const Loader = ({ loading }) => {
  return (
    <div style={{ width: "5rem", margin: "0 auto" }}>
      {" "}
      <CircleSpinner size={30} color="#686769" loading={loading} />
    </div>
  );
};
export default Loader;
