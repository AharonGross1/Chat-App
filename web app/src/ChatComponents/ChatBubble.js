import "./ChatBubble.css"

/**

 A component that renders a chat bubble with a given message and orientation.
 @param {Object} message - The message object to be displayed.
 // @param {boolean} isUser - The orientation of the chat bubble. If true, the bubble will be displayed on the right, otherwise it will be displayed on the left.
 * @param isUser
 * @param sender
 */
function ChatBubble({ message, isUser }) {
  const handletime = (message) => {
    const createdDate = message;
    if (createdDate != null) {
      return new Date(createdDate.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', });
    }
    else {
      return "";
    }
  }
  var ifyouersornot = true;
  if (message) {
    ifyouersornot = message.sender.username === isUser.username
  }
  // Set the appropriate CSS class based on the isUser prop.
  const bubbleClass = ifyouersornot ? "mine" : "yours";
  return (
    <div className={`  messages bubbleClass ${bubbleClass} `}>
      {/* Render the chat bubble with the appropriate class and message text */}
      <div className="message last" style={{ fontSize: '15px' }}>
        {message.content}
        <div class="message-time " style={{ fontSize: '10px' }}>{handletime(message)}</div>
      </div>
    </div >
  );
}

export default ChatBubble;