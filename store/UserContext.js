// UserContext.js
import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [followerId, setFollowerId] = useState(null);

  return (
    <UserContext.Provider value={{ followerId, setFollowerId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
