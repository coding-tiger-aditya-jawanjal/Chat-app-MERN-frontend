import { createContext, useContext, useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../services/api";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [auth, setAuth] = useState();
  const [openSearch, setOpenSearch] = useState(false);
  const [openAddGroup, setOpenAddGroup] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [allMyChats, setAllMyChats] = useState([]);
  const [openMyChatDrawer, setOpenMyChatDrawer] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState();
  const [currentChat, setCurrentChat] = useState();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [groupChatUsers, setGroupChatUsers] = useState([]);

  return (
    <AppContext.Provider
      value={{
        setOpenProfile,
        openProfile,
        setAuth,
        auth,
        setOpenSearch,
        openSearch,
        setOpenAddGroup,
        openAddGroup,
        setAllUsers,
        allUsers,
        setAllMyChats,
        allMyChats,
        setOpenMyChatDrawer,
        openMyChatDrawer,
        setSelectedPerson,
        selectedPerson,
        setCurrentChat,
        currentChat,
        setLoading,
        loading,
        setGroupChatUsers,
        groupChatUsers,
        setMessages,
        messages
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAccount = () => {
  return useContext(AppContext);
};

export default AppProvider;
