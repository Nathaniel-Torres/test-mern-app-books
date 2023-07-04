import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB3ANDPNyS2WZIzGrW94a528lCapfdihwE",
  authDomain: "test-mern-app-books.firebaseapp.com",
  projectId: "test-mern-app-books",
  storageBucket: "test-mern-app-books.appspot.com",
  messagingSenderId: "810631988085",
  appId: "1:810631988085:web:9b8391cdedbe8d6718893c",
  measurementId: "G-C7P0RZY4N1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export default storage;