This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Key Assumptions
* The maximun number of quantity is 10000000000, and the minimun number of quantity is -10000000000.
* The precision of quantity is 3, and it needs to do decimals to round up and round down numbers.
* The length of the company name is unlimited. 
* The company name is unique.
* Today's trades list is sorted according to data sequence by default.
* Total of trade could be 0, and it can be shown in the page.
* There is no requirement to show the history of stock trades. Stock trades will not be recorded in database.
* IE11 is the standard Browser in HSBC.
* Internationalization is out of scope.
* Calculation should be processed on backend server side, otherwise it may have performance issue. But there is no backend, so calculation should be processed on front end.
* API design and API implementation are out of scope.

## Key Decisions
* Don't enable Progressive Web App (PWA) as IE11 doesn't support
* Support pagination of stock trades list 
* At the moment, not include router and redux to make the app simple
* Add Ant Design of React to simpify development of data table
* Add axios for http as IE11 doesn't support Fetch 

## Files/Folders Structure

### components
All your Presentational components go here. These are the simple stateless ones that just take props.
Components defined in the components folder, are global and can be used anywhere in your application.

### scenes
A scene is a page of your application. These are the stateful ones, and the ones that make the API calls.

### services
Service is the place where you will define the core business logic of your application. 

## Security

### XSS (cross-site-scripting) attacks.
By default, React DOM escapes any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that’s not explicitly written in your application. Everything is converted to a string before being rendered. 

### XSRF (Cross-site request forgery)
In a common anti-XSRF technique, the application server sends a randomly generated authentication token in a cookie. The client code reads the cookie and adds a custom request header with the token in all subsequent requests. The server compares the received cookie value to the request header value and rejects the request if the values are missing or don't match.
However, as there is no backend integration in the demo, anti-XSRF technique will be applyed in future.

## Third Party Libraries
* Ant Design of React
* testing-library
* axios

## Known Issues
* Only cover some of unit test cases, and some errors will be shown when running unit test, and could not generate UnitTest report correctly.
* Some validation errors will be shown on console of browser. 

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
