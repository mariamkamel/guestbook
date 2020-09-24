# guestbook
Users can add comment, edit and delete only their comment,
All users can add replies on all comments.
guestbook consists of:
backend part: using mongodb, nodejs
  using mongoose an ODM library for mongo and node for making the work with the database easier.
  using express: web application framework for node.
  for the security and authentication:
    "bcrypt" is used for hashing password.
    "JWT" is used for generating token to create access tokens for users.
 
 frontend part: using reactjs
  3 containers (pages) was created: login,register and comments.
    comments page is a private page for only logged in users.
    "axios" was used for sending the HTTP requests to the endpoints.
    "tailwind css" was used to help in the styling.
