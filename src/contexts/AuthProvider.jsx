import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // ইউজার অবজেক্ট রাখার জন্য
  const [loading, setLoading] = useState(true); // লোডিং স্টেট

  // Create user with email & password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //sign in
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google sign in
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Update user profile (name/photo)
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // Sign out
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // observe auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  const userInfo = {
    user,
    loading,
    createUser,
    signInWithGoogle,
    updateUserProfile,
    logout,
    loginUser,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
