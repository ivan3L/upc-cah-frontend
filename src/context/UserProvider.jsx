import { UserContext } from "./UserContext"

const user = JSON.parse(localStorage.getItem('user'))
export const UserProvider = ({children}) => {
  return (
    <UserContext.Provider value={{user:  user}}>
        {children}
    </UserContext.Provider>
  )
}
