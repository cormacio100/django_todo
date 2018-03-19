# Todo App - Register/Login and create your list of Todo's 

## Overview

### What this app is for?
This app allows you to create a list of Todo's specific to you

### What does it do?
This app will allow users:
-   Register
-   Login
-   View Pages of Todos
-   Filter the list based on status
-   Create a Todo
-   Edit a Todo
-   Delete a Todo (through the edit screen)
-   Log Out

### How does it work
User must register to create a profile.
Once logged in the user can view their own list of Todo's.
User can select which page of Todos they want to view
User can narrow down search of Todos by filtering by status
This app talks to an API to filter Todos by status and page. 
User can then Create new Todos' or Edit existing ones
To Delete a Todo, open the Edit modal and set status to "Done (Remove)"

##  Features

### Existing Features
-   Login Page
-   Registration Page
-   Listing Page
-   Create Todo Modal
-   Edit Todo Modal
-   Logout Menu option

### Features Left to Implement

##  Tech Used
- [DJango](https://www.djangoproject.com/)
    I used Django for the Backend. It facilitated modelling of the Todos and users. I also created an API that 
    the Todo listing page could communicate with
- [DJango REST Framework](http://www.django-rest-framework.org/)
    The Todo listing page sends requests to a REST API to retrieve todo items
- [Python](https://www.python.org/)
    Django uses Python
- [JQuery](https://jquery.com/)
    - JQuery is used to allow a responsive front end and to talk to the API 
- [Bootstrap](http://getbootstrap.com/)
	- **Bootstrap** is used more menus and to give the app a simple responsive layout. I used version 4
- [GITHUB](https://github.com/)
    - Facilitates code sharing and version control


### Getting the code up and running locally
1.  After cloning the project ensure you have Python and Pip installed
2.  Create a virtual environment for your project and activate it
3.  From you project folder run "pip install -r requirements.txt" to install dependencies 
4.  Set up the database by running "python manage.py makemigrations" and "python manage.py migrate"
5.  Run the python server "python manage.py runserver"

### Points to note
1.  Any changess to static files shoulw be followed by the command:
   1. "python manage.py collectstatic"
   2. This will then auto update the files in staticfiles folder
   
### Screenshots
1.  Login
![login](https://user-images.githubusercontent.com/8201348/37587085-2ab07648-2b56-11e8-8ce4-ffb1bcd5de08.PNG)

2.  Registration
![register](https://user-images.githubusercontent.com/8201348/37587178-788fee0c-2b56-11e8-9a4c-5a733efea71f.PNG)

3.  Todo List
![todo_list](https://user-images.githubusercontent.com/8201348/37587243-b084ebdc-2b56-11e8-9a98-5672be791936.PNG)

4.  Logout
![todo_list](https://user-images.githubusercontent.com/8201348/37587306-dc5e0022-2b56-11e8-8bc9-b7af0d8f0d34.PNG)