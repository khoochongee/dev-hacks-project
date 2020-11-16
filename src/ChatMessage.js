import React,{forwardRef,useRef,useEffect} from 'react'
import {Avatar} from "@material-ui/core";

import "./ChatMessage.css";

const ChatMessage = forwardRef(({currentUserId,text,uid,displayName,photoURL},ref) => {
    const myRef = useRef();

    useEffect(()=>{
        myRef.current.scrollIntoView({behavior: "smooth"});
    },[text]);

    const messageBubbleStyling = ["messageBubble",(currentUserId === uid)?"messageBubble__send":"messageBubble__receive"];
      
    return (
        <>
            {
            currentUserId!==uid 
                ? 
                    <div ref={ref} className="messageRow messageRow__receive">                        
                        <Avatar className="messageRow__receive__profilePic" src={photoURL} sizes="small"/>
                        <div className="message">
                            <small ref={myRef} className={messageBubbleStyling.join(" ")}>{text}</small>
                            <span className="message__username">{displayName}</span>
                        </div>                        
                    </div>
                :
                    <div ref={ref} className="messageRow messageRow__send">
                        <div className={messageBubbleStyling.join(" ")}>
                            <span ref={myRef}>{text}</span>
                        </div>     
                    </div>
            }       
            {/* <AlwaysScrollToBottom/> */}
        </>
    )
});

export default ChatMessage
