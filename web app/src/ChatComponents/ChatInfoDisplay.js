import { useEffect } from "react";

function ChatInfoDisplay({ selectedFriend }) {
    /**
     * This function set the top bar of the chat.
     */
    useEffect(() => {
    }, [selectedFriend]);

    return (
        <div className="user-info">
            <div
                className="rounded-circle bg-primary d-flex align-items-center justify-content-center uptoolbarchatrightmargin">
                <img src={selectedFriend.user.profilePic} />
            </div>
            <div>
                <h5 className="textuptool">{selectedFriend.user.displayName}</h5>
            </div>
        </div>
    )
}

export default ChatInfoDisplay;