import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyByjdWswrp9nsVD-UZKNU_ADU7e6uu534w",
    authDomain: "reactnative-redux.firebaseapp.com",
    projectId: "reactnative-redux",
    storageBucket: "reactnative-redux.appspot.com",
    messagingSenderId: "501113441408",
    appId: "1:501113441408:web:6b9dbc8c7a003ccfa2ea65"
};
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}
export { firebase };