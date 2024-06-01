import React, { useState, useEffect } from 'react'; // Import React, useState, and useEffect hooks
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'; // Import necessary components from React Native
import axios from 'axios'; // Import axios for making HTTP requests

// Define the TakeQuizScreen component
export default function TakeQuizScreen({ route, navigation }) {
    const { quizId } = route.params; // Extract quizId from route parameters

    // Define state variables
    const [questions, setQuestions] = useState([]); // State for storing questions
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // State for tracking the current question index
    const [selectedOptions, setSelectedOptions] = useState([]); // State for tracking selected options for each question
    const [score, setScore] = useState(null); // State for storing the quiz score

    // Fetch quiz questions when the component mounts or when quizId changes
    useEffect(() => {
        axios.get(`http://localhost:3001/getQuizQuestions/${quizId}`)
            .then(response => {
                setQuestions(response.data); // Set the questions state with the fetched data
            })
            .catch(error => {
                console.error(error); // Log any errors
            });
    }, [quizId]);

    // Handle option selection for a question
    const handleOptionSelect = (index) => {
        const newSelectedOptions = [...selectedOptions]; // Create a copy of the selected options array
        newSelectedOptions[currentQuestionIndex] = index; // Update the selected option for the current question
        setSelectedOptions(newSelectedOptions); // Update the state
    };

    // Handle quiz submission
    const handleSubmitQuiz = () => {
        axios.post('http://localhost:3001/takeQuiz', {
            quizId, // ID of the quiz being taken
            answers: selectedOptions // User's selected answers
        })
            .then(response => {
                setScore(response.data.score); // Set the score state with the received score
            })
            .catch(error => {
                console.error(error); // Log any errors
            });
    };

    const currentQuestion = questions[currentQuestionIndex]; // Get the current question

    // If the score is available, display the score screen
    if (score !== null) {
        return (
            <View style={styles.container}>
                <Text>Your Score: {score}</Text>
                <Button title="Go Back" onPress={() => navigation.goBack()} /> {/* Button to navigate back */}
            </View>
        );
    }

    // Render the quiz screen
    return (
        <View style={styles.container}>
            {currentQuestion ? ( // Check if the current question is available
                <View>
                    <Text>{currentQuestion.question}</Text> {/* Display the current question */}
                    {currentQuestion.options.map((option, index) => (
                        <TouchableOpacity
                            key={index} // Key for each option
                            style={[
                                styles.option,
                                selectedOptions[currentQuestionIndex] === index && styles.selectedOption // Apply selected style if the option is selected
                            ]}
                            onPress={() => handleOptionSelect(index)} // Handle option selection
                        >
                            <Text>{option}</Text>
                        </TouchableOpacity>
                    ))}
                    <View style={styles.navigationButtons}>
                        {currentQuestionIndex > 0 && (
                            <Button title="Previous" onPress={() => setCurrentQuestionIndex(currentQuestionIndex - 1)} /> // Button to navigate to the previous question
                        )}
                        {currentQuestionIndex < questions.length - 1 ? (
                            <Button title="Next" onPress={() => setCurrentQuestionIndex(currentQuestionIndex + 1)} /> // Button to navigate to the next question
                        ) : (
                            <Button title="Submit" onPress={handleSubmitQuiz} /> // Button to submit the quiz
                        )}
                    </View>
                </View>
            ) : (
                <Text>Loading...</Text> // Display loading text while fetching questions
            )}
        </View>
    );
}

// Define styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1, // Take up full height of the screen
        padding: 20 // Add padding around the container
    },
    option: {
        padding: 10, // Add padding inside the option
        marginVertical: 5, // Add vertical margin
        borderWidth: 1, // Set border width
        borderColor: 'gray', // Set border color
        borderRadius: 5 // Set border radius
    },
    selectedOption: {
        backgroundColor: 'lightgray' // Set background color for selected option
    },
    navigationButtons: {
        flexDirection: 'row', // Arrange buttons in a row
        justifyContent: 'space-between', // Distribute buttons evenly
        marginTop: 20 // Add margin on top
    }
});
