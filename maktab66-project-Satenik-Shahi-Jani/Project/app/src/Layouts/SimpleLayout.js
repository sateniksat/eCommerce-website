import React from "react";

// const SimpleLayout = (Component) => {
//   return function WithSimpleLayout(props) {
//     return (
//       <>
//         <Component {...props} />
//       </>
//     );
//   };
// };
const SimpleLayout = (props) => {
  return <>{props.children}</>;
};
export default SimpleLayout;
