import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ metaTags }) => {
  return (
    <Helmet>
      <title>{metaTags?.title}</title>
      <meta name="description" content={metaTags?.description} />
    </Helmet>
  );
};

export default Meta;
