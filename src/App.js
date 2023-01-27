import "./App.css";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "./firebase/firebase.init";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});

  const provider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  //SIGN IN
  const handleToSignIn = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        setUser(res.user);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //SIGN OUT
  const handletoSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(() => {
        setUser({});
      });
  };
//Sign in by Github
  const handleToSignGithub = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        setUser(result.user)
        console.log(result)
      })
      .catch(err => {
        console.log(err)
    })
  }
  return (
    <div className="App">
      <h1>Hello Programmer </h1>
      {user.displayName ? (
        <button onClick={handletoSignOut}>Sign Out</button>
      ) : (
          <>
            <button onClick={handleToSignIn}>Sign In With Google</button>
            <button onClick={handleToSignGithub}>Sign with Github</button>
          </>

      )}
      {user.displayName && (
        <div>
          <h2>User Name: {user.displayName}</h2>
          {user.email && <h4>Email: {user.email}</h4>}
          <img src={user.photoURL} alt="" />
        </div>
      )}
    </div>
  );
}

export default App;
