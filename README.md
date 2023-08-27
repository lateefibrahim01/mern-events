# Event Manager App



## Table of Contents

- [Description](#description)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)



## Features

- **User Authentication**: Users can log in to the app using their Google account.

- **Create Events**: Users can create new events by providing their name, location, and event details.

- **Read Events**: Users can view a list of events in their location.

- **Update Events**: Users can edit and update event details.

- **Delete Events**: Users can delete events they have created.

- **Real-time Notifications**: When a user creates, updates, or deletes an event, other users in the app receive real-time notifications through Socket.io.

- **State Management**: Redux Toolkit is used for efficient state management in the application.

- **Responsive Design**: The app is designed to work on both desktop and mobile devices.


## Prerequisites

- Node.js and npm installed
- MongoDB server running on localhost or a remote server
- Git installed

## Getting Started

1. Clone the repository: `git clone https://github.com/lateefibrahim01/event-app.git`
2. Navigate to the `server` directory: `cd server`
3. Install server dependencies: `npm install`
4. Navigate to the `client` directory: `cd client`
5. Install client dependencies: `npm install`

## Usage

1. Start the server: `npm start` (from the serrver directory)
2. In another terminal, navigate to the `client` directory: `cd client`
3. Start the client: `npm start`
4. Access the app in your browser at: `http://localhost:3000`

## Technologies Used

- MongoDB: Database
- Express.js: Backend framework
- React: Frontend library
- Node.js: Runtime environment
- Additional technologies: Redux Toolkit, Socket.io, and Tailwind CSS

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/add-new-feature`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/add-new-feature`
5. Open a pull request on GitHub.

## License

This project is licensed under the MIT License - see the LICENSE file for details.


## Acknowledgments
Special thanks to the open-source community and the creators of the technologies used in this project.

This app was developed by Lateef Ibrahim as part of MERN Stack Apps.

## Contact
If you have any questions or suggestions, please feel free to contact [latbra@gmail.com.com].