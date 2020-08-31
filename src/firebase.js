import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
	apiKey: "AIzaSyC-Hw2sCbGf_1Gt1d1SvIsPDK6Tmosnrus",
	authDomain: "wizy-time-tracker.firebaseapp.com",
	databaseURL: "https://wizy-time-tracker.firebaseio.com",
	projectId: "wizy-time-tracker",
	storageBucket: "wizy-time-tracker.appspot.com",
	messagingSenderId: "283927259647",
	appId: "1:283927259647:web:251c761b17eb4f66071fca",
	measurementId: "G-JZXT2979V4",
});

export const emailAndPasswordSignIn = async (email, password) => {
	try {
		await auth.signInWithEmailAndPassword(email, password);
	} catch (error) {
		console.log(error);
	}
};

export const emailAndPasswordSignUp = async (email, password, name) => {
	try {
		await auth
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				result.user.updateProfile({
					displayName: name,
				});
				console.log(result);
			});

		firestore.collection("users").doc(email).set({
			name: name,
			email: email,
		});
	} catch (error) {
		console.log(error);
	}
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log("error creating user", error.message);
		}
	}

	return userRef;
};

export const createNewEntry = (userEmail, entry, project, from, to, date) => {
	firestore.collection("entry").add({
		entry,
		project,
		from,
		to,
		date,
		userEmail,
	});
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const firestore = app.firestore();
export const auth = app.auth();
