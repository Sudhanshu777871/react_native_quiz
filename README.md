# Quiz Application Setup

This guide will help you set up the Quiz Application on your local machine. The application is divided into two main parts: the frontend (React Native) and the backend (Express with MySQL).

## Prerequisites

- Node.js and npm: [Download and install](https://nodejs.org/)
- MySQL: [Download and install](https://www.mysql.com/downloads/)
- React Native CLI: [Installation guide](https://reactnative.dev/docs/environment-setup)

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

## FRONTEND SETUP
___________________

### 1. Download Zip Folder

### 2. Install Dependencies
npm install

### 3. Start the Application
npx react-native run-android # for Android
npx react-native run-ios # for iOS

### 4. Start the Application

npx react-native run-android # for Android
npx react-native run-ios # for iOS


>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

## DATABASE SETUP
__________________

### 1. Start MySQL Server
### 2. Create Database and Tables
Use XAMPP for this or ther which you want to use

Run the following SQL commands to create the database and tables:
CREATE DATABASE quiz_app;

USE quiz_app;

CREATE TABLE quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    points INT,
    time_limit INT
);

CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT,
    question TEXT,
    options JSON,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

### 3. Insert Sample Data (Optional)
INSERT INTO quizzes (name, description, points, time_limit) VALUES 
('Sample Quiz', 'This is a sample quiz.', 100, 30);

INSERT INTO questions (quiz_id, question, options) VALUES 
(1, 'Sample Question 1', '["Option 1", "Option 2", "Option 3", "Option 4"]');


>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

## BACKEND SETUP
_________________

### 1.  Navigate to the Backend Directory
cd ../backend

### 2. Install Dependencies
npm install


### 3. Configure the Database Connection
Open server.js and update the MySQL connection details if necessary:
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'quiz_app'
});

### 4. Start the Backend Server
node server.js


The server will run on http://localhost:3001
