# MapMark

This project is a simple web application that integrates React, Node.js, and Bootstrap to display a map using the Google Maps API.

## Table of Contents

- [Description](#description)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Description

The project combines a React front-end with a Node.js back-end to display a map using the Google Maps API. It serves as a starting point for building web applications that involve mapping functionalities.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine ([Download Node.js](https://nodejs.org/))
- npm (Node Package Manager) installed (comes with Node.js installation)
- Google Maps API key (instructions on obtaining one can be found [here](https://developers.google.com/maps/gmp-get-started))

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/react-nodejs-map.git

2. **Navigate to the project directory:**

    cd react-nodejs-map

3. **Install dependencies for both the client and server:**

    cd client
    npm install
    cd ../server
    npm install

## Configuration

1. **Set up the Google Maps API key:**

        -Open the client/src/components/GoogleMap.jsx file.
        -Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key.

## Usage

1. **Run the server:**

    cd server
    npm start
        -The server will run at http://localhost:3001.

2. **Run the client:**

    cd client
    npm start
        -The React app will run at http://localhost:3000.

3. **Open your browser and go to 'http://localhost:3000' to view the application.**

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
