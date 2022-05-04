
import React from "react";
import CostumerNav from "../Components/CostumerNav";
import DrawerComponent from "../Components/DrawerComponent";
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
