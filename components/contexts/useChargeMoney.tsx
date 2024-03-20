import { useContext } from "react";
import { ChargeMoneyContext, ChargeMoneyContextState } from "./ChargeMoney";

const useChargeMoney = (): ChargeMoneyContextState => {
    const context = useContext(ChargeMoneyContext);
    if (!context) {
        throw new Error(
            'useChargeMoney must be used within a StepProvider'
        );
    }
    return context;
};

export default useChargeMoney;