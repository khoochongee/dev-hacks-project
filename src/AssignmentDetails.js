import React,{useState} from 'react';
import {
    FormControl,
    Input,
    InputLabel,
    FormHelperText,
    Button,
} from "@material-ui/core";
import ReactPlayer from "react-player";
import "./AssignmentDetails.css";

function AssignmentDetails() {
    const [nameInput,setNameInput] = useState("");
    const [emailInput,setEmailInput] = useState("");
    const [isFileUpload,setIsFileUpload] = useState(false);
    const fileUpload = () => {
        setIsFileUpload(true);
        setNameInput("");
        setEmailInput("");
    }
    return (
        <>
            {isFileUpload && <div className="auth">
                <div className="backdrop" onClick={()=>setIsFileUpload(false)}></div> 
                <div className="auth__formContainer">                            
                    <div className="auth__form">
                        Your submission is uploaded successfully!
                    </div>                        
                </div>
            </div>}
            <div id="a">
                <div className="wrapper">
                <ReactPlayer
                    className="player"
                    playing
                    url={"https://www.youtube.com/watch?v=Gt44JGzMooQ"}
                    width="100%"
                    height="100%"            
                />
                </div>
                <div>
                <h2>Design the logo</h2>
                <p id="x">
                    Refer to your research from the video while designing the logo.
                    <br /> It needs to align with the mood board that you have created.
                    Incorporate the design concepts that you have identified. Briefly
                    explain the rationale behind the logo design
                </p>
                </div>
            </div>
            <div className="">
                <div className="form">
                <FormControl>
                    <InputLabel htmlFor="my-input">Name</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" value={nameInput} onChange={(e)=>{setNameInput(e.target.value)}}/>
                    <FormHelperText id="my-helper-text">
                    Please Enter your name.
                    </FormHelperText>
                </FormControl>
                <br />
                <br />
                <FormControl>
                    <InputLabel htmlFor="my-input">Email address</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" value={emailInput} onChange={(e)=>{setEmailInput(e.target.value)}}/>
                    <FormHelperText id="my-helper-text">
                    We'll never share your email.
                    </FormHelperText>
                </FormControl>
                <br />
                <br />
                <br />
                <form onSubmit={fileUpload}>
                    <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    />
                    <label htmlFor="contained-button-file"> </label>
                    <br />
                    <br />
                    <br />
                    <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    type="submit"
                    onClick={fileUpload}
                    >
                    Upload
                    </Button>
                </form>
                </div>
            </div>
        </>
    )
}

export default AssignmentDetails
