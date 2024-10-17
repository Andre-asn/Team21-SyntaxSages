import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';

const MealLoggingScreen = () => {
  const [meal, setMeal] = useState('');
  const [calories, setCalories] = useState('');
  const navigation = useNavigation();

  const handleLogMeal = () => {
    if (meal && calories) {
      alert(`Logged: ${meal} - ${calories} kcal`);
      setMeal('');
      setCalories('');
      navigation.navigate('index');
    } else {
      alert('Please enter a meal and its calories.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log a Meal</Text>
      <TextInput
        style={styles.input}
        placeholder="Meal Name"
        value={meal}
        onChangeText={setMeal}
      />
      <TextInput
        style={styles.input}
        placeholder="Calories"
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.logButton} onPress={handleLogMeal}>
        <Text style={styles.logButtonText}>LOG MEAL</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
  },
  logButton: {
    width: '100%',
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  logButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default MealLoggingScreen;
