import React from 'react'; // Import React library
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer from React Navigation
import { createStackNavigator } from '@react-navigation/stack'; // Import createStackNavigator from React Navigation

// Import custom screens for the quiz application
import CreateQuizScreen from './Screens/CreateQuizScreen';
import EditQuizScreen from './Screens/EditQuizScreen';
import TakeQuizScreen from './Screens/TakeQuizScreen';

// Create a Stack Navigator
const Stack = createStackNavigator();

// Define the main App component
export default function App() {
  return (
    // Wrap the navigator in a NavigationContainer to manage the navigation tree
    <NavigationContainer>
      {/* Define the Stack Navigator and set the initial route to CreateQuiz */}
      <Stack.Navigator initialRouteName="CreateQuiz">
        {/* Define the individual screens within the navigator */}
        <Stack.Screen
          name="CreateQuiz" // Name of the screen
          component={CreateQuizScreen} // Component to render for this screen
        />
        <Stack.Screen
          name="EditQuiz"
          component={EditQuizScreen}
        />
        <Stack.Screen
          name="TakeQuiz"
          component={TakeQuizScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
