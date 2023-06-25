import { useRef, useEffect, useState } from 'react';
import ChatBubble from './ChatBubble';

/**
 * Renders a chat conversation between a user and a friend.
 *
 * @param {object} props - The component's props.
 * @param {object[]} props.bubbles - An array of objects representing chat bubbles, each containing a `uid` property representing the friend's user ID, and a `message` property containing the text message itself.
 * @param {string} props.selectedFriend - A string representing the selected friend's user ID.
 * @returns {JSX.Element} - The rendered component.
 */
function ChatDiv({ messageiosocket, socket, user, bubbles, selectedFriend, token, update, bubblesperuser, setBubblesperuser, setUpdateCount, inituserchat }) {
    // Create a reference to the parent div that contains all the chat bubbles
    const chatbRef = useRef(null);
    // Create a reference to a dummy div element that's used for scrolling to the last chat bubble
    const chatLastBubbleRef = useRef(null);
    /**
     * this init the chat for the user with the messages from the server
     */
    useEffect(() => {
        inituserchat(selectedFriend);
    }, []);



    // Add an effect that scrolls to the last chat bubble whenever a new message is added to the conversation
    useEffect(() => {
        chatLastBubbleRef.current.scrollIntoView({ behavior: 'auto' });
    }, [bubblesperuser]);
    /**
     * this effect is for get message from the server and update the chat localy
     */
    useEffect(() => {
        if (messageiosocket && messageiosocket.sender.username === selectedFriend.user.username) {
            setBubblesperuser((prevBubbles) => [messageiosocket, ...prevBubbles]);
            selectedFriend.lastMessage = messageiosocket;
        }
    }, [messageiosocket]);

    // Add an effect that scrolls to the last chat bubble whenever the selected friend changes
    useEffect(() => {
        chatLastBubbleRef.current.scrollIntoView({ behavior: 'auto' });
    }, [selectedFriend]);

    // Render the chat bubbles for the selected friend
    return (
        <div className="chatb" ref={chatbRef} >
            {bubblesperuser.slice().reverse()
                .map((bubble, index) => (
                    <ChatBubble key={bubble.id} message={bubble}
                        isUser={user} />
                ))}
            <div ref={chatLastBubbleRef} style={{ height: 0, clear: 'both' }}></div>
        </div>
    );
}

export default ChatDiv;
