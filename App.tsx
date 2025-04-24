import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [activeTab, setActiveTab] = useState('tasks');

  const handleAddTask = () => {
    if (newTaskText.trim() === '') return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'tasks':
        return (
          <>
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
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.taskItem}>
                  <TouchableOpacity 
                    style={[styles.checkbox, item.completed && styles.checked]} 
                    onPress={() => toggleTask(item.id)}
                  />
                  <Text style={[styles.taskText, item.completed && styles.completedText]}>
                    {item.text}
                  </Text>
                  <TouchableOpacity onPress={() => removeTask(item.id)}>
                    <Text style={styles.deleteButton}>✕</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </>
        );
      case 'stats':
        return (
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>Total Tasks: {tasks.length}</Text>
            <Text style={styles.statsText}>Completed: {tasks.filter(t => t.completed).length}</Text>
            <Text style={styles.statsText}>Remaining: {tasks.filter(t => !t.completed).length}</Text>
          </View>
        );
      case 'settings':
        return (
          <View style={styles.settingsContainer}>
            <Text style={styles.settingsText}>Settings</Text>
            <Text style={styles.settingsDescription}>App settings will appear here</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <Text>Welcome to your Expo + Bun app!</Text>
        <StatusBar style="auto" />
        
        {/* Top Navigation Bar */}
        <View style={styles.navBar}>
          <Text style={styles.navTitle}>Elusive</Text>
        </View>
        
        {renderTabContent()}
        
        {/* Bottom Tab Bar */}
        <View style={styles.tabBar}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'tasks' && styles.activeTab]} 
            onPress={() => setActiveTab('tasks')}
          >
            <Text style={[styles.tabText, activeTab === 'tasks' && styles.activeTabText]}>Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'stats' && styles.activeTab]} 
            onPress={() => setActiveTab('stats')}
          >
            <Text style={[styles.tabText, activeTab === 'stats' && styles.activeTabText]}>Stats</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'settings' && styles.activeTab]} 
            onPress={() => setActiveTab('settings')}
          >
            <Text style={[styles.tabText, activeTab === 'settings' && styles.activeTabText]}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navBar: {
    height: 60,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 3,
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
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
    width: '90%',
    alignSelf: 'center',
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
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    color: '#777',
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: '#3498db',
  },
  activeTabText: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  statsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  statsText: {
    fontSize: 18,
    marginBottom: 15,
  },
  settingsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  settingsText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  settingsDescription: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
});
