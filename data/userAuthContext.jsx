import {createContext, useContext, useState} from 'react';

const UserAuthContext = createContext(undefined);

function useUserAuthContext() {
  const context = useContext(UserAuthContext);

  if (!context) {
    throw new Error(
      'useUserAuthContext must be used within an UserAuthProvider',
    );
  }
  return context;
}
const UserAuthProvider = props => {
  const [userAuth, setUserAuth] = useState("");
  return (
    <UserAuthContext.Provider {...props} value={{userAuth, setUserAuth}} />
  );
};

export {useUserAuthContext, UserAuthProvider};
