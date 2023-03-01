import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Database, getDatabase } from "firebase/database";
import { Firestore, getFirestore } from "firebase/firestore";
import { makeAutoObservable } from "mobx";

class FirebaseStore {
  firebaseConfig = {
    apiKey: "AIzaSyA1aRtM3mikMob6qmUEfslvLeTJTP5R6r8",
    authDomain: "relaxhospitalappeal.firebaseapp.com",
    databaseURL: "https://relaxhospitalappeal-default-rtdb.firebaseio.com",
    projectId: "relaxhospitalappeal",
    storageBucket: "relaxhospitalappeal.appspot.com",
    messagingSenderId: "608177529206",
    appId: "1:608177529206:web:ad1b3a4b0a778633ec5a57",
  };

  app: FirebaseApp;
  database: Database;
  firestore: Firestore;
  auth: Auth;

  constructor() {
    this.app = initializeApp(this.firebaseConfig);
    this.database = getDatabase(this.app);
    this.firestore = getFirestore(this.app);
    this.auth = getAuth();
    makeAutoObservable(this);
  }

  get getStore() {
    return this.firestore;
  }
  get getBase() {
    return this.database;
  }
  get getAuth() {
    return this.auth;
  }
}

export default new FirebaseStore();
