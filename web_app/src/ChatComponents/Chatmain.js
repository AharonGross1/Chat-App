import "./chat page.css";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ChatInfoDisplay from "./ChatInfoDisplay";
import ChatReadWrite from "./ChatReadWrite";
import ChatDiv from "./ChatDiv";
import AddContact from "./AddContactModal";
import ChatFriend from "./ChatFriend";
import { useNavigate } from "react-router-dom";

const io = require('socket.io-client');

/**

 This component is the main chat page, displaying the user's chats with friends.
 * @param {Object} props - The component's props.
 * @param {string} props.userid - The ID of the logged-in user.
 * @returns {JSX.Element} - The Chatmain component.
 */

function Chatmain({ userid, token }) {
    const [img, setimg] = useState('');
    const [userName, setUserName] = useState('');
    const [update, stateupdate] = useState('');
    const [bubbles, setBubbles] = useState([]);
    const [friends, setFriends] = useState([]);
    const [friendssave, setFriendssave] = useState([]);
    const [bubblesperuser, setBubblesperuser] = useState([]);
    const [updateCount, setUpdateCount] = useState(0);
    const [user, setUser] = useState('');
    const [msg, setmsg] = useState('');
    const [time, settime] = useState('');
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [messageiosocket, setmessageiosocket] = useState('');
    const [socketuser, setsocket] = useState('');
    const navigate = useNavigate();


    /**
     * Retrieves the logged-in user's data from localStorage and updates the state accordingly.
     */
    const jsonGetById = async () => {

        const userJSON2 = JSON.stringify({ token });
        const res = await fetch('http://localhost:5000/api/Users/' + userid, {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + token // attach the token
            }
        }
        )
        const json = await res.json();
        await setUser(json)

        await setUserName(json.displayName);
        await setimg(json.profilePic);
        const getChats = await fetch('http://localhost:5000/api/Chats/', {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + token // attach the token
            },
        }
        )

        const save = await getChats.json();
        await setFriends(save);
    };

    /** 
     * Retrieves the logged-in user's data from localStorage and updates the state accordingly.
     */
    useEffect(() => {
        jsonGetById();
    }, []);

/**
 * init the io socket
 */
    useEffect(() => {
        if (userName) {
            socketioinit();
        }
    }, [userName]);
    useEffect(() => {
        if (socketuser) {
            socketuser.emit('setUsername', userName);
        }
    }, [userName, socketuser]);


    /**
     * init the io socket on first run of the component
     */
    const socketioinit = async () => {
        // Set up the socket connection
        const socket = io('http://localhost:5001');
        setsocket(socket);
        socket.on('connect', async () => {

            console.log('Connected to the Socket.IO server' + userid);
            await socket.emit('setUsername', userid);

        });

        socket.on('disconnect', () => {
            console.log('Disconnected from the Socket.IO server');

        });

        // Set up event listeners for incoming messages
        socket.on('message', (messageData) => {
            setmessageiosocket(messageData);
        });
    };


    /**
     * Adds a new friend to the user's list of friends.
     *
     * @param {Object} friend - The new friend to add.
     */
    const handleAddFriend = async (friend) => {
        const findfriend1 = await findfriend(friend)
        if (findfriend1 == null) {
            return
        }
        //add to the list of friends
        const addFriend = (newFriend) => {
            setFriends((prevFriends) => [...prevFriends, newFriend]);
        };
        addFriend(findfriend1)
    };
    /**
     * inituserchat-init the chat scren when select on user(the click on in other place)
     * @param selectedFriend the select
     * @returns {Promise<void>}
     */
    const inituserchat = async (selectedFriend) => {
        //find the database of chats bettwen the freind and the user
        const res = await fetch('http://localhost:5000/api/Chats/' + selectedFriend.id + '/Messages', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + token
            }
        });

        const v = await res.json();
        // each msg on the json make him object
        const bubbleObjects = v.map(item => ({
            id: item.id,
            created: item.created,
            sender: item.sender,
            content: item.content
        }));
        // the main bubbles screen
        setBubblesperuser(bubbleObjects);
    };

    /**
     * find the user on the database of the server
     * @param friend The user searches
     * @returns {Promise<any>} If find return the data from the server
     */
    const findfriend = async (friend) => {
        //check if the user on the server
        const res = await fetch('http://localhost:5000/api/Chats', {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + token // attach the token
            }, body: JSON.stringify({ username: friend })
        }
        )
        if (res.status === 200) {
            await res.json();
            jsonGetById();
            return await res.json();
        } else {
            const errorResponse = await res.json();
            const errorMessage = errorResponse.error[0];
            if (errorMessage) {
                alert(errorMessage);
            } else {
                alert("Couldn't find friend!");
            }
        }
        //TODO when dont work
    }
    /**
     * update the main bubbles
     * @param updatedBubbles
     */
    const handleBubblesUpdate = (updatedBubbles) => {
        setBubblesperuser(updatedBubbles);
    };
    window.addEventListener('beforeunload', () => {
        socketuser.disconnect()
    });
    const logout = () => {
        socketuser.disconnect();
        navigate('/login')
    }

    return (
        <>
            <body>
                {/* The main chat page */}
                <div className="main-block d-flex align-items-center justify-content-end">
                    <div className="bloackchat">
                        {/* The user's info */}
                        <div className="uptoolbarchat">
                            <div className="user-info d-flex align-items-center flex-grow-1 ">
                                <div
                                    className="rounded-circle bg-primary d-flex align-items-center justify-content-center uptoolbarchatrightmargin ">
                                    <img src={img} className="uptoolbarchatrightmargin" alt="User image" />
                                </div>
                                <div>


                                    {/* <h5 className="textuptool">{userName}</h5> */}
                                    <h5 className="mt-0 textuptool">{userName.length > 10 ? userName.slice(0, 10) + '...' : userName}</h5>

                                </div>
                                {/* The button to add a new friend */}
                                <AddContact friends={friends} onAddFriend={handleAddFriend} user={userid} />
                            </div>
                        </div>
                        {/* The list of friends */}
                        <div className="row">
                            {friends.map((friend) => (
                                <ChatFriend
                                    inituserchat={inituserchat}
                                    key={friend.id}
                                    token={token}
                                    friends={friends}
                                    setfriends={setFriends}
                                    friend={friend}
                               
                                    messageiosocket={messageiosocket}
                                    setSelectedFriend={setSelectedFriend}
                                    selectedFriend={selectedFriend}
                                    onClick={() => {
                                        setSelectedFriend(friend);
                                        inituserchat(friend);
                                    }}
                                    isSelected={selectedFriend === friend}
                                //Last msg add
                                />

                            ))}
                        </div>
                    </div>
                    <div className="bloackContacts">
                        {/* The info display and chat for the selected friend */}
                        <div className="uptoolbarchat">
                            {/* The logout button */}
                            <button onClick={logout} className="logout-btn">Logout</button>
                            {/* The selected friend's info */}
                            {friends.length > 0 && selectedFriend && (
                                <ChatInfoDisplay selectedFriend={selectedFriend} />
                            )}
                        </div>
                        {selectedFriend && (
                            <>
                                {/* The chat history and input field */}
                                <div className="downchatfors">
                                    <ChatDiv messageiosocket={messageiosocket}
                                        socket={socketuser}
                                        user={user} bubbles={bubbles} selectedFriend={selectedFriend} token={token}
                                        update={update} setBubblesperuser={setBubblesperuser}
                                        bubblesperuser={bubblesperuser} inituserchat={inituserchat}
                                    />

                                    <div className="chatPrompt">
                                        <ChatReadWrite
                                            socket={socketuser}
                                            user={user}
                                            setmessageiosocket={setmessageiosocket}
                                            handleBubblesUpdate={handleBubblesUpdate}
                                            bubblesperuser={bubblesperuser}
                                            stateupdate={stateupdate}
                                            token={token}
                                            bubbles={bubbles}
                                            setBubbles={setBubbles}
                                            setUpdateCount={setUpdateCount}
                                            scrollToBottom={() => {
                                            }}
                                            selectedFriend={selectedFriend}
                                            changeFriendLocation={(selectedFriend) => {
                                                setFriends(prevFriends => {
                                                    const friendToMove = selectedFriend;
                                                    const existingFriendIndex = prevFriends.findIndex(f => f.id === friendToMove.id);

                                                    if (existingFriendIndex !== 0) {
                                                        // Friend already exists, move to top of list
                                                        const updatedFriends = [...prevFriends];
                                                        const friendToMove = updatedFriends.splice(existingFriendIndex, 1)[0];
                                                        updatedFriends.unshift(friendToMove);
                                                        return updatedFriends;
                                                    } else {
                                                        // Friend is already at the top, don't need to move
                                                        return prevFriends;
                                                    }
                                                });

                                                setSelectedFriend(selectedFriend);
                                            }}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

            </body>
        </>
    )

}

export default Chatmain