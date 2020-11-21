import firebase from "./firebase-init";

const db = firebase.firestore();
let provider = new firebase.auth.GoogleAuthProvider();

export async function getAllTemplates() {
  var ret = [],
    error = null;
  await db
    .collection("templates")
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        var _doc = doc.data();
        _doc["templateID"] = doc.id;
        ret.push(_doc);
      });
    })
    .catch((err) => {
      error = err;
    });
  if (error == null) {
    return ret;
  } else {
    return error;
  }
}

export const loginWithGooglePopup = async () => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  return await firebase.auth().signInWithPopup(provider);
};

export async function saveTemplateToDB(data) {
  //saves template json to db
  await db
    .collection("templates")
    .add(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export async function getUserTemplates(uid) {
  var ret = [],
    error = null;
  await db
    .collection("templates")
    .where("owner", "==", uid)
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        var _doc = doc.data();
        _doc["templateID"] = doc.id;
        ret.push(_doc);
      });
    })
    .catch((err) => {
      error = err;
    });
  if (error == null) {
    return ret;
  } else {
    return error;
  }
}

export async function getHistory(data) {
  //saves template json to db
  await db
    .collection("History")
    .add(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export async function getCollectionList() {
  //saves template json to db
  await db
    .collection("Collection-List")
    .get()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}
