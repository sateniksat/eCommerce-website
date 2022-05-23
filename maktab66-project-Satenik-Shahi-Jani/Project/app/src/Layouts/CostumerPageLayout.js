import React from "react";
import CostumerNav from "../components/CostumerNav";
import DrawerComponent from "../components/DrawerComponent";

// const CostumerPageLayout = (Component) => {
//   return function CostumerPage(props) {
//     return (
//       <>
//         <CostumerNav />
//         <Component {...props} />
//       </>
//     );
//   };
// };
// export default CostumerPageLayout;
const CostumerPageLayout = (props) => {

    return (
      <>
        <CostumerNav />
        {props.slider ? < DrawerComponent/> : null}
        {props.children}
      </>
    );

};
export default CostumerPageLayout;