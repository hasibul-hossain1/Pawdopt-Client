import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase.init";

export const createUserWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};
export const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
export const updateProfileUser = (obj) => {
  return updateProfile(auth.currentUser, obj);
};
export const signInUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
export const signOUtUser = () => {
  return signOut(auth);
};
export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};
