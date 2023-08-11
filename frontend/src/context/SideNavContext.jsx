import { createContext, useState } from "react";

const SideNavContext = createContext();

export const SideNavProvider = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  return (
    <SideNavContext.Provider value={{ sidebarVisible, setSidebarVisible }}>
      {children}
    </SideNavContext.Provider>
  );
};

export default SideNavContext;
