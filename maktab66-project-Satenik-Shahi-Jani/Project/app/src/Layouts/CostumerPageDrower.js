
import React from "react";
import CostumerNav from "../components/CostumerNav";
import DrawerComponent from "../components/DrawerComponent";
const CostumerPageDrower = (Component) => {
  return function CostumerPage(props) {
    return (
      <>
        <CostumerNav />
        <DrawerComponent/>
        <Component {...props} />
      </>
    );
  };
};
export default CostumerPageDrower;
