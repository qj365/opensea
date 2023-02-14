import { createContext, useState } from 'react';

const SidebarContext = createContext();

function SidebarContextProvider({ children }) {
    const [sidebarIsVisible, setSidebarIsVisible] = useState(false);

    const toggleSidebar = function () {
        setSidebarIsVisible(sidebarIsVisible => !sidebarIsVisible);
        document.body.style.overflow =
            document.body.style.overflow === 'hidden' ? 'auto' : 'hidden';
    };

    const hideSidebar = function () {
        setSidebarIsVisible(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <SidebarContext.Provider
            value={{ sidebarIsVisible, hideSidebar, toggleSidebar }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

export { SidebarContext, SidebarContextProvider };
