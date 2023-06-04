import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBYZRKF3dUpRUAWX2toevMLQUUnGNu_tr0",
    authDomain: "api-xml-eade3.firebaseapp.com",
    projectId: "api-xml-eade3",
    storageBucket: "api-xml-eade3.appspot.com",
    messagingSenderId: "642710029482",
    appId: "1:642710029482:web:243e5924638b76f01afcd3",
    measurementId: "G-4BKZTGPY0B",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;