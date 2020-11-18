import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCVCbqlu3AMLWTUebto0GcQmAQrAiVj19w",
    authDomain: "file-validation-engine.firebaseapp.com",
    databaseURL: "https://file-validation-engine.firebaseio.com",
    projectId: "file-validation-engine",
    storageBucket: "file-validation-engine.appspot.com",
    messagingSenderId: "37456960445",
    appId: "1:37456960445:web:751daf888588283cd7d0d4"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;