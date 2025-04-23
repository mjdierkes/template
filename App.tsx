import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ConvexClientProvider from './convex/ConvexClientProvider';
import { useMutation, useQuery } from 'convex/react';
import { api } from './convex/_generated/api';

function TodoApp() {
  const [newTaskText, setNewTaskText] = useState('');
  const tasks = useQuery(api.tasks.get) || [];
  const addTask = useMutation(api.tasks.add);
  const toggleTask = useMutation(api.tasks.toggle);
  const removeTask = useMutation(api.tasks.remove);

  const handleAddTask = async () => {
    if (newTaskText.trim() === '') return;
    await addTask({ text: newTaskText });
    setNewTaskText('');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTaskText}
          onChangeText={setNewTaskText}
          placeholder="Add a new task"
        />
        <Button title="Add" onPress={handleAddTask} />
      </View>
      <FlatList
        style={styles.list}
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity 
              style={[styles.checkbox, item.completed && styles.checked]} 
              onPress={() => toggleTask({ id: item._id })}
            />
            <Text style={[styles.taskText, item.completed && styles.completedText]}>
              {item.text}
            </Text>
            <TouchableOpacity onPress={() => removeTask({ id: item._id })}>
              <Text style={styles.deleteButton}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

export default function App() {
  return (
    <ConvexClientProvider>
      <TodoApp />
    </ConvexClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  list: {
    width: '100%',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3498db',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#3498db',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  deleteButton: {
    color: '#e74c3c',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
