# Pasta: Localhost

## Your local folder to share files in your network! 🚀

### Ever wanted to share your files between your devices in your local network? Now you can!

<br/>

## How it works?

The application works using the following technologies:

### Backend

- Express
- Knex (Query builder)
- Multer (File upload handler)
- Sqlite3
- Typescript

### Frontend

- Vue.js
- PrettyBytes (For file formatting)

## How to use it?

To use it, follow the steps below:

### #1 - Clone the repository

First you must clone this repository to have it locally, and to so paste the command below in your terminal:

<code> git clone https://github.com/arthurvergacas/pasta-localhost.git </code>

### #2 - Install all the proper dependecies

After cloning, go into the folder and paste the following command:

<code> npm install --only=prod </code>

This will install all the necessaries dependencies to run the application.

#### 🟠 Installation for development

If you know what you're doing and want to mess with the code yourself, simply run <code>npm install</code>, to install both <code>dependencies</code> and <code>devDependencies</code>. Then, edit the TS files, and to test it use <code>npm run dev</code>.

### #3 - Set your secret in .env file

After instalation, you must set your own secret in the .env file so the JWT authentication works properly. To do so, go to <code>.env</code> file and change the <code>SECRET=YOUR_JWT_SECRET_HERE</code> to youw own secret (a password to encrypt and decrypt the JWT token).

### #4 - Create the local database

Next, you will have to create the database to keep track of all files and users. Simply run <code>npm run create-db</code> and you should be done.

### #5 - Start the application

After all configured, you should be able to run <code>npm start</code> with no errors. If everything went fine, the terminal should display the message "Listening on port 80". To access the app, go to http:/localhost and enjoy! 😊
