# BuzzTalk

This is a texting program comprised of a server, a web app, and an Android app.

## Client:
### Registration and Login
These pages will allow you to enter the chat if you create a unique user. The identifier is the username, so it must be unique or you won't be able to create the user.

### Chat page:
- Adding new users to your contacts - can add only existing users.
- Sending messages to your contacts.
- Different chat for each contact.
- Deleting contacts (note - the chat with that contact will only be deleted for you. The contact will still be able to see the chat they have with you.)
- Uses Io and Firebase to update the chat dynamically without refresh.
- Changing themes via the settings, so you can enjoy the theme you like most.


## Running the program:
### MongoDB
Download Mongodb - community edition from [here](https://www.mongodb.com/try/download/community), and run it in its default port - 27017.

### Server & Web app
- cd into the cloned repo and, after making sure MongoDB is up and running, enter the following commands in the cmd:
```
  cd server
```
- Install the software needed for the program:
```
  npm install
```
- Run the program:
```
  npm start
```
- In the browser enter the following:
```
  localhost:5000/
```

### Web app without server
- cd into the cloned repo and, after making sure your server is up and running, enter the following commands in the cmd:

```
  cd web_app
```
- Install the software needed for the program:
```
  npm install
```
- Run the program:
```
  npm start
```

### Android app
- Make sure to run the server before using the app.
- Clone the repo in Android Studio and run the program, either on an emulator or an Android phone
- Change the IP in the settings (inside the login page) to match your current IP. If you are using an emulator, the ip should be defaulted to work with the emulator - 10.0.2.2


## Tools used in the program:
### Server
- A database using MongoDB, which stores all the data.
- The MVC server runs the logic and makes sure everything is fine.
- Io and Firebase, to allow receiving messages from other users without the need to refresh the page.

### Web app
The web app was built with React and is styled using CSS.

![registration page](https://raw.githubusercontent.com/AharonGross1/Chat-App/main/screenshots/registration%20web.png)

![main page](https://raw.githubusercontent.com/AharonGross1/Chat-App/main/screenshots/main%20page%20web.png)

### Android app
The Android app was built using Android Studio and Java.

<a href="url"><img src="https://raw.githubusercontent.com/AharonGross1/Chat-App/main/screenshots/login%20app.jpg" align="left" height="510" width="255" ></a>

<a href="url"><img src="https://raw.githubusercontent.com/AharonGross1/Chat-App/main/screenshots/main%20page%20app.jpg" align="left" height="510" width="255" ></a>

<a href="url"><img src="https://raw.githubusercontent.com/AharonGross1/Chat-App/main/screenshots/chat%20app.jpg" align="left" height="510" width="255" ></a>

## <br /><br />Authors

- [Asaf Rozen](https://www.github.com/asafaar)
- [Aharon Gross](https://github.com/AharonGross1)
