# MyPolls API

This is the backend for the MyPolls application, a poll management tool built with **Node.js** and **Express**. It provides a REST API for managing polls, their options, and user authentication, ensuring secure access to poll data.

- MyPolls Deploy App: https://mypolls-app.onrender.com/
- Mypolls Deploy Api: https://mypolls-api.onrender.com/

#### Features
- CRUD operations for managing polls.
- Each poll can have multiple response options.
- API follows RESTful principles for easy integration with the frontend.
- User authentication to restrict access to polls.
- API documentation available via Swagger.

#### Getting Started

1. Clone this repository:
```bash
git clone https://github.com/taisbronca/mypolls-api.git
```

2. Navigate into the project directory:
```bash
cd mypolls-api
```

3. Install dependencies:
```bash
npm install
# Or if using yarn
yarn install
```

4. Run the server:
```bash
npm run dev
# Or with yarn
yarn dev
```
The API will be accessible at http://localhost:3000.

5. View API documentation: Access the Swagger documentation at http://localhost:3000/doc/.


#### Technologies
- **Node.js** and **Express** for the server-side logic.
- **MongoDB** for data persistence.
- **Swagger** for Documentation.

#### Frontend Repository
The frontend for the MyPolls application is available [here](https://github.com/taisbronca/mypolls-app).

#### API Endpoints Overview
- **/polls**: Create, read, update, and delete polls.
- **/users**: Create, read, ad update users.
- **/auth**: User authentication and authorization routes.

#### Development Environment
- Server running at: http://localhost:3000
- Swagger documentation: http://localhost:3000/doc/

#### Environment Variables
To run the MyPolls API, make sure to set up the following environment variables:

- **MONGODB_URI**: Your MongoDB connection string from MongoDB Atlas. After mongodb.net/, make sure to add the name of your database.

Example:
```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
```
- **SECRET_JWT**: A secret key used for generating JSON Web Tokens (JWT). You can generate a secure key using an MD5 hash generator.

Example:
```bash
SECRET_JWT=your-md5-generated-secret
```

Create a .env file in the root directory of your project and add the variables like this:
```bash
MONGODB_URI=<your-mongodb-uri>
SECRET_JWT=<your-secret-jwt>
```


#### License
This project is licensed under the MIT License.


###### tags: `back-end` `Node.js` `MongoDB` `Express`
