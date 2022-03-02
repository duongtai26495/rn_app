import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCZkT8_lkJc5qbty_-RuqsW7gSlf8uy5rM",
  authDomain: "quickimage-2022.firebaseapp.com",
  databaseURL: "https://quickimage-2022-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quickimage-2022",
  storageBucket: "quickimage-2022.appspot.com",
  messagingSenderId: "872256857295",
  appId: "1:872256857295:web:9de634c8ffb69b646a03ba"
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
export default firebase_app