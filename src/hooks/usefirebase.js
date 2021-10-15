import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";

const useFirebase = () => {
  const [users, setUsers] = useState({});
  const auth = getAuth();

  const signInUsingGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider).then((result) => {
      setUsers(result.user);
    });
  };
  useEffect(() => {
    const unsubscrived = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsers(user);
      } else {
        setUsers({});
      }
    });
    return () => unsubscrived;
  }, []);
  const logOut = () => {
    signOut(auth).then(() => {});
  };
  return {
    users,
    signInUsingGoogle,
    logOut,
  };
};
export default useFirebase;
