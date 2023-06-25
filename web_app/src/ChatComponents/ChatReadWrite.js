import { useState } from "react";
import "./ChatFriend.css";
import { BiSend } from 'react-icons/bi';

/**
 * This component allows the user to send and receive messages in a chat with a selected friend.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.selectedFriend - The ID of the friend the user is chatting with.
 * @param {Array} props.bubbles - The array of chat bubbles to display in the chat.
 * @param {function} props.setBubbles - A function to update the bubbles array.
 * @param {function} props.scrollToBottom - A function to scroll the chat to the bottom.
 * @returns {JSX.Element} - The ChatReadWrite component.
 */
function ChatReadWrite({
    setmessageiosocket,
    user,
    socket,
    selectedFriend,
    scrollToBottom,
    changeFriendLocation,
    token,
    handleBubblesUpdate,
    bubblesperuser
}) {
    // Define state variables for the input field and hover state of the send button
    const [isHovered, setIsHovered] = useState(false);
    const [message, setMessage] = useState("");


    /**
     * Handles sending a message when the send button is clicked or Enter is pressed in the input field.
     * If the message input field is not empty, a new chat bubble is added to the bubbles array.
     */
    const handleSend = async () => {

        if (message.trim() !== "") {
            setMessage("");
            const res = await fetch('http://localhost:5000/api/Chats/' + selectedFriend.id + '/Messages', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'bearer ' + token // attach the token
                }, body: JSON.stringify({ msg: message, username: user.username, profilePic: user.profilePic, displayName: user.displayName })
            }
            );
            // await stateupdate(1)
            const v = await res.json();
            const bubbleObjects = {
                id: v.id,
                created: v.created,
                sender: v.sender,
                content: v.content
            };
            const currentBubbles = [...bubblesperuser];
            // selectedFriend
            if (selectedFriend.lastMessage != null) {
                selectedFriend.lastMessage = bubbleObjects
            } else {
                const bubbleObjects = {
                    id: v.id,
                    created: v.created,
                    content: v.content
                };
                selectedFriend.lastMessage = bubbleObjects
            }


            const updatedBubbles = [bubbleObjects, ...currentBubbles];
            // Update the state with the updated list of bubbles
            handleBubblesUpdate(updatedBubbles);
            changeFriendLocation(selectedFriend);
            setmessageiosocket(bubbleObjects)
            // selectedFriend(null)
            //the user send msg to the server

            socket.emit('message', { bubbleObjects: bubbleObjects, selectedFriend: selectedFriend.user.username, sender: user.username });
        }
    };


    /**
     * Sets the isHovered state to true when the mouse enters the send button.
     */
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    /**
     * Sets the isHovered state to false when the mouse leaves the send button.
     */
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    /**
     * Handles the keydown event of the input field.
     * If the Enter key is pressed, it calls the handleSend function.
     *
     * @param {Object} e - The keydown event object.
     */
    const handleKeyDown = async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            await handleSend();

        }
    };

    return (
        <>
            {/* The chat input field and send button */}
            <div className="downchat">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control-search-bar"
                        placeholder="         Enter your text here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        aria-label="New message here..."
                        aria-describedby="basic-addon2"
                    />
                    <div className={`input-group-append ${isHovered ? 'hovered' : ''}`}>
                        <BiSend
                            style={{ fontSize: '3vw', color: '#blue', }}
                            onClick={handleSend}
                            alt="Send message"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className={isHovered ? 'gray-filter' : ''} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChatReadWrite;
