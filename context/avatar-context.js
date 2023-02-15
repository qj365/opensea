import { createContext, useState } from 'react';

const AvatarContext = createContext();

function AvatarContextProvider({ children }) {
    const [avatar, setAvatar] = useState(null);
    return (
        <AvatarContext.Provider value={{ avatar, setAvatar }}>
            {children}
        </AvatarContext.Provider>
    );
}

export { AvatarContext, AvatarContextProvider };
