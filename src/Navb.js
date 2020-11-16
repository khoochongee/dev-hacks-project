import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from "react-router-dom"
import {Nav,Navbar} from 'react-bootstrap';
import {connect} from "react-redux";
import {auth} from "./firebase";

const Navb = (props) => {
    return (
        <div>
          <Navbar expand="lg" style={{background:'#D1DCDE'}}>
            <Navbar.Brand>
              <NavLink to="/"><img src={`${process.env.PUBLIC_URL}/Logo.jpg`} alt="Logo" style={{width: '10rem',height: '2.5rem',marginLeft:'1rem'}} /></NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav ">
              <Nav className="navbar-nav ml-auto">
                <Nav.Link href="/" style={{
                  padding:'1.5rem'
                }} className="nav-item nav-link px-3">Home</Nav.Link>
                <Nav.Link href="/project" style={{
                  padding:'1.5rem'
                }} className="nav-item nav-link px-3">Project</Nav.Link>
                <Nav.Link href="/services" style={{
                  padding:'1.5rem'                  
                }} className="nav-item nav-link px-3">Services</Nav.Link>
                {props.currentUser && <Nav.Link style={{padding:'1.5rem'}} className="nav-item nav-link px-3" onClick={()=>{auth.signOut()}}>Sign Out</Nav.Link>}
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
              </Nav>                                    
            </Navbar.Collapse>
          </Navbar>
        </div>
    )
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(Navb);
