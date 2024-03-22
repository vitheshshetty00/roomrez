# Project Name

# Project Name

This project is a room booking system built with Next.js 14 and Firebase. It allows users to view available rooms, book a room for a specific date and time, and view their bookings. The system checks for booking conflicts to prevent double-booking of rooms. Firebase is used for authentication, allowing users to sign in to book rooms and view their bookings, and for storage, storing the room and booking data. The project uses a modern, responsive design to provide a great user experience on both desktop and mobile devices.

## Application Pages

The application consists of several pages, each serving a specific purpose:

- **Login Page**: This page allows users to log in to the application using their email and password. Once logged in, users can book rooms and view their bookings.

- **Register Page**: This page allows new users to register for the application. Users need to provide their email and password to create a new account.

- **Admin Page**: This page provides a user interface for administrators to manage rooms. Administrators can add new rooms, edit existing rooms, and remove rooms.

- **Home Page**: This is the main page of the application. It displays a list of available rooms. Users can select a room, choose a date and time, and book the room. The system checks for booking conflicts to prevent double-booking of rooms. Users can also view their bookings on this page.

 
## Accessing the Admin Page

Currently, the admin page can be accessed using the following credentials:

- Email: vitheshshettyxx@gmail.com
- Password: 12345678

In the future, we plan to implement a more secure system with user roles, where only users with the "admin" role will be able to access the admin page. For the time being, it is done this way for simplicity and ease of testing.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)


## Installation

1. Clone the repository or download the zip extract it:

    ```bash
    git clone https://github.com/vitheshshetty00/roomrez.git
    ```


2. Install the dependencies:

    ```bash
    npm install
    ```

## Usage

1. Configure the project:

   - create .env and  add the variables from env.txt 

    - Update the configuration file (`config.js` or similar) with the required settings.

2. Start the application:

    ```bash
    npm run dev
    ```

3. Open your web browser and navigate to `http://localhost:3000` to access the application.

### Take look at screent shot of the project in screenshots folder

i have deleted .next and node_modules folder to reduce the size of the project
