// Import necessary modules
const express = require('express'); // Import Express framework
const bodyParser = require('body-parser'); // Import body-parser for parsing request bodies
const cors = require('cors'); // Import CORS for handling cross-origin requests
const mysql = require('mysql2'); // Import MySQL for database connection

const app = express(); // Create an instance of Express
const port = 3001; // Define the port number for the server

// Use CORS middleware to allow cross-origin requests
app.use(cors());
// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost', // MySQL server host
    user: 'root', // MySQL user
    password: 'password', // MySQL password
    database: 'quiz_app' // MySQL database name
});

// Connect to MySQL database
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err); // Log connection error
        return;
    }
    console.log('Connected to MySQL'); // Log successful connection
});

// Endpoint to create a quiz
app.post('/createQuiz', (req, res) => {
    const { name, description, points, timeLimit } = req.body; // Extract quiz details from request body
    const query = 'INSERT INTO quizzes (name, description, points, time_limit) VALUES (?, ?, ?, ?)'; // SQL query to insert quiz
    db.query(query, [name, description, points, timeLimit], (err, result) => {
        if (err) {
            res.status(500).send(err); // Send error response if query fails
        } else {
            res.status(201).send({ id: result.insertId }); // Send success response with new quiz ID
        }
    });
});

// Endpoint to add a question to a quiz
app.post('/addQuestion', (req, res) => {
    const { quizId, question, options } = req.body; // Extract question details from request body
    const query = 'INSERT INTO questions (quiz_id, question, options) VALUES (?, ?, ?)'; // SQL query to insert question
    db.query(query, [quizId, question, JSON.stringify(options)], (err, result) => {
        if (err) {
            res.status(500).send(err); // Send error response if query fails
        } else {
            res.status(201).send({ id: result.insertId }); // Send success response with new question ID
        }
    });
});

// Endpoint to get quiz questions
app.get('/getQuizQuestions/:quizId', (req, res) => {
    const { quizId } = req.params; // Extract quizId from request parameters
    const query = 'SELECT id, question, options FROM questions WHERE quiz_id = ?'; // SQL query to fetch questions
    db.query(query, [quizId], (err, results) => {
        if (err) {
            res.status(500).send(err); // Send error response if query fails
        } else {
            // Parse options and send questions in response
            const questions = results.map(q => ({
                id: q.id,
                question: q.question,
                options: JSON.parse(q.options)
            }));
            res.send(questions); // Send questions in response
        }
    });
});

// Endpoint to take the quiz and get score
app.post('/takeQuiz', (req, res) => {
    const { quizId, answers } = req.body; // Extract quizId and answers from request body
    const query = 'SELECT id, question, options FROM questions WHERE quiz_id = ?'; // SQL query to fetch questions
    db.query(query, [quizId], (err, results) => {
        if (err) {
            res.status(500).send(err); // Send error response if query fails
        } else {
            let score = 0; // Initialize score
            results.forEach((question, index) => {
                // Find the correct answer index
                const correctAnswerIndex = JSON.parse(question.options).findIndex(opt => opt.isCorrect);
                if (answers[index] === correctAnswerIndex) {
                    score++; // Increment score if answer is correct
                }
            });
            res.send({ score }); // Send score in response
        }
    });
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`); // Log server start
});
