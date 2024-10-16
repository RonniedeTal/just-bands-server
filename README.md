# JustBands

## [See the App!](https://just-bands.netlify.app)

![App Logo](https://ibb.co/jJnNQPC)

## Description

**NOTE -** Describe your project in one/two lines.

#### [Client Repo here](https://github.com/RonniedeTal/just-bands-client)
#### [Server Repo here](https://github.com/RonniedeTal/just-bands-server)

## Backlog Functionalities

-a call to render the crew of a band
-payment with credit cars
-more functionalitys comming soon

## Technologies used

**NOTE -** javascript, node, express, MongoDB, mongoose, JWT auth.

# Server Structure

## Models
user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "User is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    favorite: {
      type: [Schema.Types.ObjectId], //ask----
      ref: "Band",
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    //add img profile --------------------ToDO
    /*profileImage:{
      type:String,
      default:""
    },*/
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

band model
const BandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name required"],
    },
    description: {
      type: String,
    },
    profileImage: {
      type: String,
      default: "",
    },
    genre: {
      type: [String], //gives an array of...
      enum: [
        "Stoner",
        "Metal",
        "Alternative",
        "Grunge",
        "Hardcore",
        "DeathMetal",
        "Psycodellic",
        "Progressive",
        "Punk",
        "Grindcore",
        "Others",
        "Thrash",
      ],
      required: [true, "Choose a Genre "],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User", //----------------added just for one owner of the band
    },
    country: {
      type: String,
    },
    crew: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    instagramUrl: {
      type: String,
      default: "",
    },
    spotifyUrl: {
      type: String,
      default: "",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);
const Band = mongoose.model("Band")


```
comment model
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    band: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Band",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);
const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                    |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | -------------------------------------------------------------- |
| POST        | `/auth/signup`              | {name, email, password}      | 201            | 400          | Registers the user in the Database                             |
| POST        | `/auth/login`               | {username, password}         | 200            | 400          | Validates credentials, creates and sends Token                 |
| GET         | `/auth/verify`              |                              | 200            | 401          | Verifies the user Token                                        |
| put         | `/:userId`                   |                              | 200            | 400          | update the userS images                   |
| GET         | `/:userId`                   | {apiId}                      | 201            | 400          |get all users   Document                                    |
| PATCH       | `/:bandId/favorite`           |                             | 200            | 400, 401     | update only favorites Details                                         |
| POT         | `/ `                        |                              | 200            | 400, 401     | post comments  document                                            |
| get         | `/`             |                            | 200            | 200          | get all the comments document                                          |
| GET         | `/:commentId`               |                              | 200            | 401          | get a comment bY id documents                                     |
| GET         | `/by-bands/:bandId`                  |                     | 200            | 400, 401     | get comments of an especific band document                                         |
| DELETE      | `/:commentId`          |                                    | 200            | 401          | get all comments by id documents                                         |
| POST        | `/`                          |                              | 201           | 401          | create a band (Search)                               |
| GET         | `/`                          |                              | 200            | 401          | Gets all bands

| GET         | `/random`                    |                              | 200            | 401          | get a random band | 

GET           | `/:bandId`                    |                             | 200            | 401          | Gets a band by id 

put           | `/:bandId`                    |                             | 200            | 401          | update a band 

delete        | `/:bandId`                    |                             | 202            | 401          | delete a band API                                     |
  
## Links

### Collaborators

[Developer 1 name](https://github.com/RonniedeTal)



### Project

[Repository Link Client](www.your-github-url-here.com)

[Repository Link Server](www.your-github-url-here.com)

[Deploy Link](https://just-bands.netlify.app)

### Trello



### Slides

[Slides Link](www.your-slides-url-here.com)