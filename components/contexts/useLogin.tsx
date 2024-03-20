import { useContext } from "react";
import { LoginContext, LoginContextState } from "./LoginContext";

const useLogin = (): LoginContextState => {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error(
            'useStep must be used within a StepProvider'
        );
    }
    return context;
};

export default useLogin;