import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthProvider from './src/context/AuthContext';
import TaskProvider from './src/context/TaskContext';

import LoginScreen from './src/screens/LoginScreen';
import KanbanScreen from './src/screens/KanbanScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ title: 'Login' }}
            />
            <Stack.Screen 
              name="Kanban" 
              component={KanbanScreen} 
              options={{ title: 'Task Board' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TaskProvider>
    </AuthProvider>
  );
}
