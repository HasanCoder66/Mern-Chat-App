import react from "react";
import { Helmet } from "react-helmet-async";

const Title = ({ title = "Chat App", description = "Chat with us now!" }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
    </Helmet>
  );
};

export default Title;
