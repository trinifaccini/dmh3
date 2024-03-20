import { useContext } from "react";
import { PaymentServiceContext, PaymentServiceContextState } from "./PaymentServiceContext";

const usePaymentService = (): PaymentServiceContextState => {
    const context = useContext(PaymentServiceContext);
    if (!context) {
        throw new Error(
            'usePaymentService must be used within a PaymentServiceProvider'
        );
    }
    return context;
};

export default usePaymentService;