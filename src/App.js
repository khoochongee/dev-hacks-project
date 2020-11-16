import React,{useState,useEffect} from "react";
import {connect} from "react-redux";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Navb from "./Navb";
import Home from "./Home";
import Chat from "./Chat";
import Project from "./Project";
import Services from "./Services";
import AssignmentDetails from "./AssignmentDetails";
import Loading from "./Loading";
import {auth,db} from "./firebase";
import * as actionTypes from "./store/actionTypes";

function App({setCurrentUser,finishLoading,...props}) {
  const [chatMessages,setChatMessages] = useState([]);    

  useEffect(() => {
    auth.onAuthStateChanged(currentUser=>{
      if(currentUser){
        setCurrentUser(currentUser);        
      }else{
        setCurrentUser(null);
      }
      finishLoading();      
    });        
    db.collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot=>{
      setChatMessages(snapshot.docs.map(doc=>({
        ...doc.data(),
        id:doc.id
      })));
    });        
  }, [setCurrentUser,finishLoading]);  

  return (
    <Router>
      <div className="app">
        {props.loading ? <Loading/> :         
          <>            
            <Navb/>            
            {/* <NavLink to="/">Logo</NavLink>           */}
            {/* {props.currentUser ? <Button onClick={()=>{auth.signOut()}}>Sign Out</Button> : <Button onClick={()=>setShowAuth(true)}>Signin</Button>  }               */}                          
            <Switch>
              <Route exact path="/assignment-detail">
                <AssignmentDetails/>
              </Route>
              <Route exact path="/project">
                <Project/>
              </Route>
              <Route exact path="/services">
                <Services/>
              </Route>
              <Route exact path="/chat">            
                {props.currentUser ? <Chat messages={chatMessages}/> : <Redirect to="/"/>}                
              </Route>                 
              <Route path="/">                             
                <Home/>
                {/* {props.currentUser && (
                  <>                  
                    <NavLink to="/chat">Lets Chat</NavLink>                      
                  </>
                )} */}
              </Route>
            </Switch>      
          </>
        }
      </div>            
    </Router>
  );
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: (currentUser) => dispatch({type:actionTypes.SET_USER,currentUser:currentUser}),
    finishLoading: () => dispatch({type:actionTypes.PAGE_LOADED})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
