import { useContext } from "react";
import { ProfileContext, ProfileContextState } from "./ProfileContext";

const useProfile = (): ProfileContextState => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error(
            'useProfile must be used within a ProfileProvider'
        );
    }
    return context;
};

export default useProfile;