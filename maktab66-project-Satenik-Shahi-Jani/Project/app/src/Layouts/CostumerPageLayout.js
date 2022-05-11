import React from "react";
import CostumerNav from "../components/CostumerNav";

const CostumerPageLayout = (Component) => {
  return function CostumerPage(props) {
    return (
      <>
        <CostumerNav />
        <Component {...props} />
      </>
    );
  };
};
export default CostumerPageLayout;
