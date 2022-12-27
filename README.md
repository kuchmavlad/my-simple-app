## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [How to Use the App](#how-to-use-the-app)
* [Features](#features)

## General info

It is simple React application, created to skillup. The main technology for building the app was used react-router-dom v6.4. The application has a minimum of styles, the main styles were taken from the react-router-dom guide. App can receive data, modify, delete and add. Also app has simple authorization.
	
## Technologies

Project is created with:
* React-router-dom v6.4
* Type script
* Classnames
* React Context
* React-icons
* Json-server
* Abssoluting path
	
## Setup

To run this project, install it locally using npm:

```
$ npm install
$ npm run server
$ npm start
```



## How to Use the App

App is a multi-page site with authorization. Email is used as authorization(can use Sincere@april.biz or '1' for authorization).

### Home page
Simple page.

### Posts page
Get all posts.
* Сan get the first 10 posts
* Can add new post(required authorization)
* Can click on the post and get the full details of the post.

### User page(required authorization)
Get all users.
* Can search users
* Can add new user
* Can edit/remove user
* Can choose favorite user

## Tests

In developing

```
$npm test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


## Features

* Add new post
* Edit post
* Albums page
* Tests
* Fix any type


