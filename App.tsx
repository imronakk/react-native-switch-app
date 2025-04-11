import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const savedSwitch = await AsyncStorage.getItem('switchState');
      const savedName = await AsyncStorage.getItem('userName');
      if (savedSwitch !== null) setIsEnabled(JSON.parse(savedSwitch));
      if (savedName !== null) setName(savedName);
    };
    loadData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('switchState', JSON.stringify(isEnabled));
  }, [isEnabled]);

  const handleNameChange = (text: string) => {
    setName(text);
    setIsEnabled(false); // Reset switch when name is changed
    AsyncStorage.setItem('userName', text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>React Native Switch Demo</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name..."
        value={name}
        onChangeText={handleNameChange}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>{isEnabled ? 'ON' : 'OFF'}</Text>
        <Switch
          trackColor={{ false: '#ccc', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#007bff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={setIsEnabled}
          value={isEnabled}
        />
      </View>

      {isEnabled && name.trim() !== '' ? (
        <Text style={styles.greeting}>Hello, {name}!</Text>
      ) : null}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    height: 50,
    borderColor: '#aaa',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginVertical: 16,
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
  },
  greeting: {
    marginTop: 20,
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});