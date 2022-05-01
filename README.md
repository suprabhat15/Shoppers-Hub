# Shoppers-Hub
This repository is about **responsive** e-commerce MERN stack web app that allows users to shop different kinds of products ranging from daily usable items to electronic products and many more. It has features like ```Pagination```, ```Search```, ```Filter```, ```Login```, ```Registration```, ```Image Uploading```, ```Authentication```.

  Many features like ```Payment Integration```, ```Analysis of products using Charts```, ```User Reviews```, ```Admin dashboard```, etc. are in process of implementation.


**Tech Stacks Used -** 
1. **React JS, Hooks**
2. **NodeJS, Express**
3. **MongoDB**
4. **Redux**
5. **Axios for API Calls**
6. **Cloudinary for Image Uploading**

## Folder Structure
```
├── FrontEnd 
      └── public
      └── src
           └── actions
                  └── cartAction.js
                  └── orderAction.js
                  └── productAction.js
                  └── userAction.js
           └── component
                  └── Home
                  └── Product
                  └── Route
                  └── User
                  └── layout
           └── constants
                  └── @mui/labnts.js
                  └── userConstants.js
           └── images
           └── reducers
                  └── productReducer.js
                  └── userReducer.js
           └── App.js
           └── store.js
      └── package.json
            
├── BackEnd 
      └── config
             └── database.js
       └── controllers
             └── orderController.js
             └── productController.js
             └── userController.js
       └── middleware
             └── auth.js 
             └── catchAsyncErrors.js
             └── error.js
       └── models
             └── orderModel.js 
             └── productModel.js
             └── userModel.js
       └── routes
             └── orderRoute.js 
             └── productRoute.js
             └── userRoute.js
       └── utils
             └── apifeatures.js 
             └── errorHandler.js
             └── jwtToken.js
             └── sendEmail.js
       └── app.js
       └── server.js
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
