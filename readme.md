SignUp -> https://demo-react-ugyr.onrender.com/api/user/sign_up {username,email,password,phoneNumber}
GetUsers -> https://demo-react-ugyr.onrender.com/api/user/get_users
Login -> https://demo-react-ugyr.onrender.com/api/user/login {email,password}
UpdateUser -> https://demo-react-ugyr.onrender.com/api/user/update_user

https://demo-react-ugyr.onrender.com/api/user/userDetails

searchUser :- https://demo-react-ugyr.onrender.com/api/user/searchUser
1:41
in params pass name as a query
1:41
https://demo-react-ugyr.onrender.com/api/user/searchUser?q=saquib
1:41
like that

Create Chat :- https://demo-react-ugyr.onrender.com/api/chat/create_chat
if chatType is GroupChat you have to pass title.
if chatType is OneToOne you have to pass userId of another user
1:57
Add User :- https://demo-react-ugyr.onrender.com/api/chat/addUsers
you have to send userIds[]& title

bro, request body send karna
6:42
create chat aur add user ki

Abhishek Kothiya
6:44 PM
GroupChat :- chatType, title
OneToOne :- chatType , userIds
