import React from "react";
const SimpleLayout = (Component) => {
  return function WithSimpleLayout(props) {
    return (
      <>
        <Component {...props} />
      </>
    );
  };
};
export default SimpleLayout;
