import { app } from "../apis/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();
const providerGithub = new GithubAuthProvider();
const registerUserWithEmailAndPassword = async (email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return response.user
  } catch (error) {
    return error.message
  }
};

const loginUserWithEmailAndPassword = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);    
    return response.user
  } catch (error) {
    return error.message
  }
};

const resetPassword = async (email) => {
  try {
    const response = await sendPasswordResetEmail(auth, email);
    return response
  } catch (error) {
    return error.message
  }
};

const logoutFromApp = async () => {
  try {
    const response = await signOut(auth);
    return response
  } catch (error) {
    return error.message
  }
};

const loginByGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, providerGoogle);
    const credential = GoogleAuthProvider.credentialFromResult(response);
    const token = credential.accessToken;
    const user = response.user;
  } catch (error) {
    console.log(error);
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    return errorMessage
  }
};
const loginByGithub = async () => {
  try {
    const response = await signInWithPopup(auth, providerGithub);
    const user = response.user;
    return user
  } catch (error) {
    console.log(error);
    const errorCode = error.code;
    const errorMessage = error.message;
    return errorMessage
  }
};
const updateUserProfile = async (currentUser, form) => {
  try {
    const response = await updateProfile(currentUser, form)
    console.log(response)
  } catch (error) {
    const errorMessage = error.message;
    return errorMessage
  }
}

export {
  auth,
  registerUserWithEmailAndPassword,
  loginUserWithEmailAndPassword,
  resetPassword,
  logoutFromApp,
  loginByGoogle,
  loginByGithub,
  updateUserProfile
};
