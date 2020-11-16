import React,{useState} from 'react'
import {connect} from "react-redux";
import {Button, TextField} from '@material-ui/core';
import firebase from 'firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import * as actionTypes from "./store/actionTypes";
import {auth} from "./firebase";
import "./Auth.css";

function Auth(props) {
    const [isSignin,setIsSignin] = useState(true);    
    const [username,setUsername] = useState('');  
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');    

    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',  
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/',
        // We will display Facebook as auth providers.
        signInOptions: [    
          firebase.auth.GoogleAuthProvider.PROVIDER_ID        
        ],
        callbacks: {
          // Avoid redirects after sign-in.
          signInSuccessWithAuthResult: (result) => {                  
            // db.collection("users").doc(result.user.uid).get().then((doc)=>{                                                                                                        
            //   if(!doc.exists){                        
            //     const photoURL = result.user.photoURL + "?access_token=" + result.credential.accessToken;
            //     db.collection("users").doc(result.user.uid).set({
            //       displayName:result.user.displayName,
            //       email:result.user.email,
            //       photoURL: photoURL
            //     });
            //     auth.currentUser.updateProfile({
            //       photoURL:photoURL
            //     });
            //   }                
            // });  
            props.authLoading();     
            props.cancelShowAuth();                   
            setUsername("");
            setEmail("");
            setPassword("");
          }                    
        }
    };
      
    const authHandler = (event) => {
        event.preventDefault();    
        if(isSignin){
            auth.signInWithEmailAndPassword(email,password)
                .then(result=>{                    
                })
                .catch(err=>{
                    console.log(err);
                });
        }else{
            auth.createUserWithEmailAndPassword(email,password)
                .then(result=>{
                    result.user.updateProfile({
                        displayName:username
                    })
                })
                .catch(err=>{
                    console.log(err);
                });
        }
        props.authLoading();
        props.cancelShowAuth();        
        setUsername("");
        setEmail("");
        setPassword("");
    }
    return (
        <div className="auth">
            <div className="backdrop" onClick={props.cancelShowAuth}></div>
            <div className="auth__formContainer">        
                {/* <Lock className="signin__lockIcon"/> */}
                <form className="auth__form" onSubmit={authHandler}>
                    {!isSignin && <TextField label="Username" variant="filled" className="form__input" value={username} onChange={(event)=>setUsername(event.target.value)}/>}
                    <TextField label="Email" variant="filled" className="form__input" value={email} onChange={(event)=>setEmail(event.target.value)}/>
                    <TextField label="Password" variant="filled" className="form__input" type="password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
                    <Button className="form__button" onClick={authHandler} variant="contained">{isSignin ? "Sign In" : "Sign Up"}</Button>
                    <div className="form__switchAuthMethod">{isSignin ? "Don't have an account yet? Create one" : "Already have an account? Sign In" }<span className="switchAuthMethod__word" onClick={()=>setIsSignin(!isSignin)}> here</span></div>
                    <div className="form__otherAuthMethod">
                        OR
                    </div>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
                </form>                        
            </div>            
        </div>
    )
}

const mapStateToProps = state => {
    return state
}
  
const mapDispatchToProps = dispatch => {
    return {
        authLoading: () => dispatch({type:actionTypes.PAGE_LOADING})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth)
