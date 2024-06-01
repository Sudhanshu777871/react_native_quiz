import React, { useState } from 'react'; // Import React and useState hook
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'; // Import necessary components from React Native
import axios from 'axios'; // Import axios for making HTTP requests

// Define the EditQuizScreen component
export default function EditQuizScreen({ route }) {
    const { quizId } = route.params; // Extract quizId from route parameters

    // Define state variables to store the question and options
    const [question, setQuestion] = useState(''); // State for the question text
    const [options, setOptions] = useState(['', '', '', '']); // State for the options (initially four empty strings)

    // Function to handle adding a new question
    const addQuestion = () => {
        // Make a POST request to add the question to the quiz
        axios.post('http://localhost:3001/addQuestion', {
            quizId, // ID of the quiz to which the question is being added
            question, // The question text
            options // The options for the question
        })
        .then(response => {
            console.log(response.data); // Log the response data
            // Clear the input fields after successfully adding the question
            setQuestion(''); // Reset question state to an empty string
            setOptions(['', '', '', '']); // Reset options state to four empty strings
        })
        .catch(error => {
            console.error(error); // Log any errors
        });
    };

    // Render the UI for editing the quiz
    return (
        <View style={styles.container}>
            <Text>Question:</Text>
            <TextInput
                style={styles.input}
                value={question}
                onChangeText={setQuestion} // Update question state on change
            />
            <Text>Options:</Text>
            {options.map((option, index) => (
                <TextInput
                    key={index} // Key for each option input field
                    style={styles.input}
                    value={option}
                    onChangeText={text => {
                        const newOptions = [...options]; // Create a new array with current options
                        newOptions[index] = text; // Update the option at the current index
                        setOptions(newOptions); // Update options state
                    }}
                />
            ))}
            <Button title="Add Question" onPress={addQuestion} /> {/* Button to add question */}
        </View>
    );
}

// Define styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1, // Take up full height of the screen
        padding: 20 // Add padding around the container
    },
    input: {
        height: 40, // Set input height
        borderColor: 'gray', // Set border color
        borderWidth: 1, // Set border width
        marginBottom: 20, // Add margin below each input
        paddingLeft: 10 // Add padding inside the input
    }
});
