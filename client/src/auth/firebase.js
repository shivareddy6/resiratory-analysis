import firebase from "firebase";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAGmynWFBoq6As2Wd_CJzjkgzXKs3TZGmg",
  authDomain: "tut-database.firebaseapp.com",
  projectId: "tut-database",
  storageBucket: "tut-database.appspot.com",
  messagingSenderId: "718262711626",
  appId: "1:718262711626:web:27b26152d4f682a9ed3db3",
};
firebase.initializeApp(firebaseConfig);

export default firebase;

// apiKey: "AIzaSyDUm7DwJIL911lEePGhTyFimfl-67jXk_E",
// authDomain: "respiratoryanalysis.firebaseapp.com",
// projectId: "respiratoryanalysis",
// storageBucket: "respiratoryanalysis.appspot.com",
// messagingSenderId: "585669154198",
// appId: "1:585669154198:web:1cb625c7995f937b6079b7",
// measurementId: "G-4VLWHSW6WG"