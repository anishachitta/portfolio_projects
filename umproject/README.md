# User Management Project Using React js and Express js

This is a user management project that begins with a login authentication screen. The login screen uses the express backend to only authorizes certain users with registered usernames and passwords to access the main application. If the user enters incorrect login info, it alerts the user regarding this authorization failure.

## Tab 1

This tab allows the administration to add the details of a user if they would like to create a new record, edit the record once the user has been generated, and delete the user entirely. The users are displayed in a table underneath the form taking in the user details. Each user has a delete button and edit button adjacent to the details displayed. These users and their information is stored in the backend, and is retrieved every time the website is initialized.

## Tab 2

This tab allows the administration to add the details specific to different roles that would fit the need for their team. It follows a similar pattern to tab 1, in that there is a section of the page where the admin can add the details of the role, and the available roles are displayed in a table below the form. Each role has its own edit and delete button that can be activated by a click, and the roles are retained even if the webpage closes.

## Tab 3

This tab connects the information from tab 2 and incorporates it into a checkbox-grid layout. With the roles being displayed on the top of the grid, and permissions (which are created by the admin and stored in a database), into a column, the admin can choose which permissions are applicable for the various roles they have. The admin clicks on the save button to save these permissions. These selections are also retained upon initialization of the webpage.
