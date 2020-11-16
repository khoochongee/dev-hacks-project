import React,{useState,useEffect,useRef} from 'react';
import {Button, TextField} from "@material-ui/core";
import {ToggleButton} from "@material-ui/lab";
import Send from "@material-ui/icons/Send";
import {Smile} from "react-feather";
import {Picker} from "emoji-mart";
import 'emoji-mart/css/emoji-mart.css';
import FlipMove from "react-flip-move";
import {connect} from "react-redux";
import firebase from "firebase";
import CustomScroller from "react-custom-scroller";

import {db} from "./firebase";
import ChatMessage from "./ChatMessage";
import "./Chat.css";

const Chat = ({messages,...props}) => {
    const inputRef = useRef();
    const emojiPickerRef = useRef();
    const emojiPickerToggleButtonRef = useRef();
    const [input,setInput] = useState("");
    const [inputError,setInputError] = useState(false);    
    const [selectEmojiPicker,setSelectEmojiPicker] = useState(false);        

    useEffect(()=>{                    
        document.addEventListener("mousedown",clickHandler);        
        return () => {
            document.removeEventListener("mousedown",clickHandler);            
        }
    },[emojiPickerRef]);    

    const sendMessageHandler = (event) => { 
        event.preventDefault();               
        if(input){
            db.collection("messages").add({
                text:input,
                timestamp:firebase.firestore.Timestamp.now(),
                uid:props.currentUser.uid,
                photoURL:props.currentUser.photoURL,
                displayName:props.currentUser.displayName
            });
            setInput("");            
        }else{
            setInputError(true);
        }                
        inputRef.current.focus();        
    };    

    const selectEmojiPickerHandler = (value) => {        
        setInput(prevInput=>prevInput+value.native);
        inputRef.current.focus();
    };

    const clickHandler = (event) => {        
        try {                                
            if(emojiPickerRef.current && emojiPickerToggleButtonRef.current && !emojiPickerRef.current.contains(event.target) && !emojiPickerToggleButtonRef.current.contains(event.target)){
                setSelectEmojiPicker(false);
            }                
        }catch(error){
            console.log(error);
        }
    };
    
    return (        
        <div className="chat">                        
            <div className="chat__messagesContainer">                
                <CustomScroller style={{maxWidth:"100%",height:"100%",padding:"0 10px 0 0"}}>
                    <FlipMove className="chat__messages" enterAnimation={{from:{transform:"translateY(10px)"},to:{transform:"translateY(0)"}}}>
                        {messages && messages.map(({id,text,uid,displayName,photoURL},index)=><ChatMessage key={id} text={text} currentUserId={props.currentUser.uid} uid={uid} displayName={displayName} photoURL={photoURL}/>)}
                    </FlipMove> 
                </CustomScroller>
            </div>            
            {selectEmojiPicker && <div ref={emojiPickerRef}><Picker set="facebook" style={{ position: 'absolute', bottom:'60px', right:'40px' }} showPreview={false} showSkinTones={false} onSelect={selectEmojiPickerHandler} emojiTooltip={true}/></div>}            
            <form className="chat__form" onSubmit={sendMessageHandler}>
                <TextField inputRef={inputRef} className="chat__messageTextField" value={input} onChange={(event)=>{setInputError(false);setInput(event.target.value)}} error={inputError} onBlur={()=>{setInputError(false)}} label={inputError?"Field cannot be empty":"Enter your message... "} autoFocus/>
                <ToggleButton ref={emojiPickerToggleButtonRef} selected={selectEmojiPicker} onChange={()=>{setSelectEmojiPicker(prevState=>!prevState)}} value={selectEmojiPicker} className="chat__emojiPickerButton">
                    <Smile />
                </ToggleButton>
                <Button className="chat__messageSendButton" onClick={sendMessageHandler} variant="text">
                    <Send/>
                </Button>
            </form>
        </div>                            
    )
}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Chat);
