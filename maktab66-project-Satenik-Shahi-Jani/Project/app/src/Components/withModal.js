import React from "react";
const ModalHOC=(Component)=>{
    return function WithModal(props){
        return (
            <>
            <Component {...props}/>
            </>
        )
    }
}
export default ModalHOC;