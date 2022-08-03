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
} from "firebase/auth";
const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();
const providerGithub = new GithubAuthProvider();
const registerUserWithEmailAndPassword = async (email, password) => {
  console.log(email, password);
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(response.user);
  } catch (error) {
    console.log("error code auth", error.code);
    console.log("error message auth", error.message);
  }
};

const loginUserWithEmailAndPassword = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log(response.user);
  } catch (error) {
    console.log("error code auth", error.code);
    console.log("error message auth", error.message);
  }
};

const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Link Reset sent");
  } catch (error) {
    console.log("error code auth", error.code);
    console.log("error message auth", error.message);
  }
};

const logoutFromApp = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
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
  }
};
const loginByGithub = async () => {
  try {
    const response = await signInWithPopup(auth, providerGithub);
    const user = response.user;
  } catch (error) {
    console.log(error);
    const errorCode = error.code;
    const errorMessage = error.message;
  }
};

export {
  auth,
  registerUserWithEmailAndPassword,
  loginUserWithEmailAndPassword,
  resetPassword,
  logoutFromApp,
  loginByGoogle,
  loginByGithub,
};
