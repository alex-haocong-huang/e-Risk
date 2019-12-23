This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Key Assumptions
* IE11 is the standard Browser in HSBC
* There will be a huge data of stock trades
* Internationalization is out of scope
* Quantities max number is 10000000000, min number is -10000000000, precision is 2
* Length of company name is unlimited 
* Company name is unique
* Today's trades list is sorted by data sequence
* There is no requirement to show the history of stock trades. Stock trades will not be record in database
* Calculation should be process on backend server side, otherwise it may have performance issue. But there is not backend, Calculation should be process on front end
* API design and API implementation are out of scope

## Key Decisions
* Only Support IE11
* Don't enable Progressive Web App (PWA) as IE11 doesn't support
* Support pagination of stock trades list as the data will be huge
* At the moment, don't include router and redux to make the app simple
* Add Ant Design of React to simpify development of datatable
* Add axios for http as IE11 doesn't support Fetch 

## Files/Folders Structure

### components
All your Presentational components go here. These are the simple stateless ones that just take props.
Components defined in the components folder, are global and can be used anywhere in your application.

### scenes
A scene is a page of your application. These are the stateful ones, and the ones that make the API calls.

### services
service is the place where you will define the core business logic of your application. 

## Security

### XSS (cross-site-scripting) attacks.
By default, React DOM escapes any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that’s not explicitly written in your application. Everything is converted to a string before being rendered. 

### XSRF (Cross-site request forgery)
In a common anti-XSRF technique, the application server sends a randomly generated authentication token in a cookie. The client code reads the cookie and adds a custom request header with the token in all subsequent requests. The server compares the received cookie value to the request header value and rejects the request if the values are missing or don't match.
However, as there is no backend integration in the demo, anti-XSRF technique will be applyed in future.

## Code Convention
It requires 0 warnning on the EsLint report. All Eslint issues should be resolved before release.

## Third Party Libraries
* Ant Design of React
* testing-library
* axios

## Unit Test
### Coverage Reporting
`yarn test -- --coverage `
Run abolve script (note extra -- in the middle) to include a coverage report

### Continuous Integration
`CI=true npm run build`
Assume CI is running on linux base docker

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
