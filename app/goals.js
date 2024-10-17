import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';

const GoalsScreen = () => {
  const [dailyCalories, setDailyCalories] = useState('');
  const navigation = useNavigation();

  const handleSetGoal = () => {
    if (dailyCalories) {
      alert(`Goal Set: ${dailyCalories} kcal per day`);
      setDailyCalories('');
      navigation.navigate('index'); 
    } else {
      alert('Please enter a daily calorie goal.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Daily Calorie Goal</Text>
      <TextInput
        style={styles.input}
        placeholder="Calories"
        value={dailyCalories}
        onChangeText={setDailyCalories}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.goalButton} onPress={handleSetGoal}>
        <Text style={styles.goalButtonText}>SET GOAL</Text>
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
  goalButton: {
    width: '100%',
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  goalButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default GoalsScreen;
