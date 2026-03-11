import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const { REACT_APP_APIKEY, REACT_APP_PRJID, REACT_APP_APPID } = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_APIKEY,
  projectId: REACT_APP_PRJID,
  appId: REACT_APP_APPID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;