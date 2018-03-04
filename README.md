This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


To get started perform the following steps on a windows 7/8/10 pc
1.  Install node.js from https://nodejs.org/en/download/
2.  Install Git from https://git-scm.com/download/win and start Git bash.
3.  Create a directory ($mkdir C:\projects ) & enter it ($cd C:\projects)
4.  Clone this repository with command ($git clone https://github.com/manishgrd/notify_webapp.git)
5.  After cloning completes, enter directory.($cd C:\projects\notify_frontend_webapp )
6.  On gitbash run the command $npm install
    This will install all the required dependencies for the project.
    It should complete without error and a few warnings ( you can ignore it).
7.	Run $npm start . This will launch the project in your default web-browser
    with address localhost:3000 or 127.0.0.1:3000
8.	There it is, the Notify app is running locally.
9. The backend is hosted at hasura.io along with Google firebase integration.

      About the main ui--(Runs both locally & hosted at hasura.io)
	  
10. Login & Signup with the appropriate credentials.

11. On login the user is taken to the homepage from where they can see the 
   latest notifications appearing just below the top navigation bar.

12. The Navigation bar at the topmost has Buttons to switch back from anypage to homepage and logout the user. 
    Also the user is greeted along with a display of their profile pic.

13. Three buttons are present on the action bar for the following functions:
   (a)Compose New: Opens a dialog box to select the user and enter the notification message and press Push button to notify the user.
   (b)View Online: Opens up a drawer on the right listing the online users to notify them directly.
   (c)All Notifications: opens a separate page listing all the notifications users sent / received in a tabular format that is scrollable.

14. Below them is a tabbed navigation that separately displays Received & Sent notifications, categorising them as they arrive.

15. Tabular view to see at a glance some of the recent notifications which can be selected for following actions in Bottom navigation bar.

16. View : See the Notification in a pop up dialog
   
12. The Navigation bar at the topmost has Buttons to switch back from anypage to homepage and logout the user. 
    Also the user is greeted along with a display of their profile pic.
    
13.Three buttons are present on the action bar for the following functions:
   (a)Compose New: Opens a dialog box to select the user and enter the notification message and press Push button to notify the user.
   (b)View Online: Opens up a drawer on the right listing the online users to notify them directly.
   (c)All Notifications: opens a separate page listing all the notifications users sent / received in a tabular format that is      scrollable.
   
  14. Below them is a tabbed navigation that separately displays Received & Sent notifications, categorising them as they arrive.
  
 15. Tabular view to see at a glance some of the recent notifications which can be selected for following actions in Bottom navigation bar.
 
 16. View : See the Notification in a pop up dialog
     Clear: Delete the selected notifications
     Notify others: Forward a pre-composed/ received notification to other users
	
17. A snackbar that momentarily pops below when a new notification arrives to grab users attention.

18. Clicking the logout button redirects to login page for authentication.
	 
