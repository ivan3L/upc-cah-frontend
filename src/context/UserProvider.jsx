import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  console.log("userContext", user)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
