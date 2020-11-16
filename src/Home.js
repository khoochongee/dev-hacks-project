import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Jumbotron,Container} from 'react-bootstrap';
import {connect} from "react-redux";

import Auth from "./Auth";
import './Home.css';

const Home = (props) => {
    const [showAuth,setShowAuth] = useState(false); 
    return (
        <>            
            {showAuth && <Auth cancelShowAuth={()=>setShowAuth(false)}/>}
            <div className="Home" style={{backgroundImage: `url('${process.env.PUBLIC_URL }/BgImg.png')`}}>                
                <Container>
                    <Jumbotron style={{marginTop:"5rem",marginLeft:"2.5rem",background:"rgba(6, 6, 6, 0.59)",color:"white",padding:"2rem",width:"85%"}}>  
                        <h2>JOIN THE BIGGEST COMMUNITY OUT THERE WITH CAREERPRO</h2>                 
                    </Jumbotron>
                </Container>
                <div style={{display:'flex',justifyContent:"center",alignItems:"center"}}>
                    {props.currentUser ?
                        <Button style={{cursor:"default",margin:"4rem",width: '10rem',height: '4rem',background: '#000000'}}>
                            {props.currentUser?.email}
                        </Button>
                        :
                        <Button onClick={()=>setShowAuth(true)} style={{margin:"4rem",width: '10rem',height: '4rem',background: '#000000'}}>
                            Signin Here
                        </Button>
                        
                    }
                    {/* <Button onClick={setShowAuth} style={{margin:"4rem",width: '10rem',height: '4rem',background: '#000000'}}>
                        Sign up                
                    </Button> */}
                </div>                  
            </div>   
        </>
    )
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(Home);
