# construction-management-system
MERN Full-Stack construction management web app

For a list of project dependencies, see the package.json file, refer to the snippet below.
Note, dependency listed below may not reflect most recent version. 
```
Node v10.13.0
Server Files: {
"dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.18.3",
    "concurrently": "^4.1.0",
    "express": "^4.16.4",
    "express-validator": "^5.3.1",
    "jsonwebtoken": "^8.4.0",
    "mongoose": "^5.4.3",
    "passport": "^0.4.0",
    "passport-jwt": "^4.0.0",
    "validator": "^10.10.0"
  }
}
  
Client Files: {
  "dependencies": {
    "react": "^16.7.0",
    "react-dom": "^16.7.0",
    "react-router-dom": "^4.3.1",
    "react-scripts": "2.1.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "proxy": "http://localhost:5000",
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ]
}
