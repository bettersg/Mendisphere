import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDzOfSyn6c3BDAO3ZXFUM4KjRL_3TSDTxo",
    authDomain: "mindbetter-bettersg.firebaseapp.com",
    projectId: "mindbetter-bettersg",
    storageBucket: "mindbetter-bettersg.appspot.com",
    messagingSenderId: "963292055223",
    appId: "1:963292055223:web:c8b64fbe722ca6436a2f32",
    measurementId: "G-80GB9ZHTHK"
}; 

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);