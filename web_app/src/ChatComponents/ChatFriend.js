import React, { useEffect, useState } from 'react';
import "./ChatFriend.css"
import { AiOutlineDelete } from "react-icons/ai";
// import { use } from '../../server/routes/userLogin';



/**
 * This component represents a friend in the user's chat list.
 * @param {Object} props - The component's props.
 * @param {Object} props.friend - The friend to display.
 * @param {function} props.onClick - A function to call when the friend is clicked.
 * @param {boolean} props.isSelected - Whether the friend is currently selected.
 * @param {Array} props.messages - An array of messages for the friend.
 * @returns {JSX.Element} - The ChatFriend component.
 */
function ChatFriend({
    messageiosocket,
    setfriends,
    messageData,
    friends,
    friend,
    onClick,
    isSelected,
    token,
    setSelectedFriend,
    selectedFriend
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [msg, setmsg] = useState('');
    const [time, settime] = useState('');
    const [isHoveredicon, setIsHoveredicon] = useState(false);

    /**
     Sets the isHovered state to true when the mouse enters the friend card.
     */
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    /**
     Sets the isHovered state to false when the mouse leaves the friend card.
     */
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const handledeluser = async () => {

        const res = await fetch('http://localhost:5000/api/Chats/' + friend.id, {
            method: 'DELETE',
            headers: {
                "accept": ' */*',
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token // attach the token
            }, body: JSON.stringify({ friend: friend })
        }
        ); // fetch data from the url endpoint

        const updatedFriends = await friends.filter((f) => f !== friend);
        // Update the state with the new array
        if (friend.id === selectedFriend.id) {
            setSelectedFriend(null);
        }
        await setfriends(updatedFriends);



    }
    /**
     * sets the time of the last message of the friend.
     * @param {*} lastMessage 
     * @returns 
     */
    function handletime(lastMessage) {
        const createdDate = lastMessage;
        if (createdDate != null) {
            return new Date(createdDate.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else {
            return "";
        }
    }
    /**
     * sets the last message of the friend.
     * @param {*} lastMessage 
     * @returns 
     */
    function handlelastmsg(lastMessage) {
        const createdDate = lastMessage;
        if (createdDate != null) {
            return lastMessage.content
        } else {
            return "";
        }
    }
    /**
     * This function sets the time and message of the last msg when made a change on last msg.
     */
    async function initmsgandtime() {
        if (friend.lastMessage && friend.lastMessage.created) {
            const v = handletime(friend.lastMessage);
            settime(v);
        } else {
            settime('');
        }

        if (friend.lastMessage && friend.lastMessage.content) {
            const v2 = handlelastmsg(friend.lastMessage);
            setmsg(v2);
        } else {
            setmsg('');
        }
    }
    /**
     * if the last user message is not null, set the time and message of the friend.
     */
    useEffect(() => {
        initmsgandtime();
    }, [friend.lastMessage]);

    /**
     * This hook updates the time and message of the friend when a new message is received. when this dont the user that display the message is the friend.
     */
    useEffect(() => {
        console.log(messageiosocket)
        if(messageiosocket&&messageiosocket.sender.username===friend.user.username){
            console.log("messageiosocket.sender.username===friend.username")
             const fixtime=new Date(messageiosocket.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });       
            settime(fixtime);
            setmsg(messageiosocket.content);
        }
    }, [messageiosocket]);

    return (
        <div
            className={`row-4`}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* The friend card */}
            <div className="card">


                <div className={`card-body textwithback ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}>

                    <div className="media d-flex">
                        <img
                            src={friend.user.profilePic}
                            className="rounded-circle rounded-circleforlist mr-15"
                            alt="User image"
                            width="32"
                        />

                        <div class="top-part">

                            <h5 className="mt-0 usertext">{friend.user.displayName.length > 10 ? friend.user.displayName.substring(0, 10) + '...' : friend.user.displayName}</h5>
                            <h1 className="last-message-time">{time}
                                <button
                                    type="button"
                                    className={`btn iconDefinitions ${isHoveredicon ? 'button-hover' : ''}`}
                                    onMouseEnter={() => setIsHoveredicon(true)}
                                    onMouseLeave={() => setIsHoveredicon(false)}
                                    onClick={handledeluser}
                                >
                                    <AiOutlineDelete className={`  ${isHoveredicon ? 'button-hover' : ''}`} />
                                </button>
                            </h1>
                        </div>
                        <div className="last-message" style={{ fontSize: '15px' }}>{msg}

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ChatFriend;
