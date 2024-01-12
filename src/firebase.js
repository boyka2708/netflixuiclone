import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGK1LhtFPewhEzGpIQO1_HBCC8DljxwCA",
  authDomain: "netflix-clone-ddab7.firebaseapp.com",
  projectId: "netflix-clone-ddab7",
  storageBucket: "netflix-clone-ddab7.appspot.com",
  messagingSenderId: "304745894499",
  appId: "1:304745894499:web:3898dfc762e3639a459e56",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)

const auth = getAuth(firebaseApp);

export { auth, createUserWithEmailAndPassword };

export default db;
