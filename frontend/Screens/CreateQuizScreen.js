import React, { useState } from 'react'; // Import React and useState hook
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'; // Import necessary components from React Native
import axios from 'axios'; // Import axios for making HTTP requests

// Define the CreateQuizScreen component
export default function CreateQuizScreen({ navigation }) {
    // Define state variables to store form inputs
    const [name, setName] = useState(''); // State for quiz name
    const [description, setDescription] = useState(''); // State for quiz description
    const [points, setPoints] = useState(''); // State for quiz points
    const [timeLimit, setTimeLimit] = useState(''); // State for quiz time limit

    // Function to handle quiz creation
    const createQuiz = () => {
        // Make a POST request to create a new quiz
        axios.post('http://localhost:3001/createQuiz', {
            name, // Quiz name
            description, // Quiz description
            points: parseInt(points), // Convert points to integer
            timeLimit: parseInt(timeLimit) // Convert time limit to integer
        })
        .then(response => {
            console.log(response.data); // Log the response data
            // Navigate to the EditQuiz screen with the created quiz ID
            navigation.navigate('EditQuiz', { quizId: response.data.id });
        })
        .catch(error => {
            console.error(error); // Log any errors
        });
    };

    // Render the UI for creating a quiz
    return (
        <View style={styles.container}>
            <Text>Quiz Name:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName} // Update quiz name state on change
            />
            <Text>Description:</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription} // Update quiz description state on change
            />
            <Text>Points:</Text>
            <TextInput
                style={styles.input}
                value={points}
                onChangeText={setPoints} // Update quiz points state on change
                keyboardType="numeric" // Use numeric keyboard
            />
            <Text>Time Limit (minutes):</Text>
            <TextInput
                style={styles.input}
                value={timeLimit}
                onChangeText={setTimeLimit} // Update quiz time limit state on change
                keyboardType="numeric" // Use numeric keyboard
            />
            <Button title="Create Quiz" onPress={createQuiz} /> {/* Button to create quiz */}
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
