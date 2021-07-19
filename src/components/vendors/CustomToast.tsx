import React from "react";
import { Alert } from '@windmill/react-ui'
interface ICustomToast {
    children:any,
    appearance:string,
    onDismiss:(Id:string) => void
}

const CustomToast = ({ appearance, children ,onDismiss}:ICustomToast) => {
    switch (appearance) {
        case "error":
            return <Alert type="danger" className={"mt-2"} onClose={onDismiss}>{children}</Alert>;
        default :
            return <Alert type="success" className={"mt-2"} onClose={onDismiss}>{children}</Alert>;
    }
};

export default CustomToast;