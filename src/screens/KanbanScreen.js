import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { DraxProvider } from 'react-native-drax';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';
import KanbanColumn from '../components/KanbanColumn';
import TaskModal from '../components/TaskModal';

export default function KanbanScreen({ navigation }) {
  const { loggedInUser, logout, allUsers } = useContext(AuthContext);
  const {
    getFilteredTasks,
    updateTask,
    deleteTask,
    createTask,
    searchQuery,
    setSearchQuery,
    filterPriority,
    setFilterPriority,
    filterStatus,
    setFilterStatus,
    sortField,
    setSortField,
  } = useContext(TaskContext);

  const [modalVisible, setModalVisible] = useState(false);
  const tasks = getFilteredTasks();
  const todo = tasks.filter((t) => t.status === 'To-Do');
  const inProgress = tasks.filter((t) => t.status === 'In Progress');
  const done = tasks.filter((t) => t.status === 'Done');

  const handleLogout = () => {
    const res = logout();
    if (res.success) {
      navigation.navigate('Login');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hellllo {loggedInUser?.username}</Text>
        <Button title="Logout" onPress={handleLogout} color="#5bc0de" />
      </View>

      <View style={styles.topControls}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search your tasks..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+ Add a Task</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <Picker
          style={styles.picker}
          selectedValue={filterPriority}
          onValueChange={(val) => setFilterPriority(val)}
        >
          <Picker.Item label="All Priorities" value="" />
          <Picker.Item label="Low" value="Low" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="High" value="High" />
        </Picker>

        <Picker
          style={styles.picker}
          selectedValue={filterStatus}
          onValueChange={(val) => setFilterStatus(val)}
        >
          <Picker.Item label="All Statuses" value="" />
          <Picker.Item label="To-Do" value="To-Do" />
          <Picker.Item label="In Progress" value="In Progress" />
          <Picker.Item label="Done" value="Done" />
        </Picker>

        <Picker
          style={styles.picker}
          selectedValue={sortField}
          onValueChange={(val) => setSortField(val)}
        >
          <Picker.Item label="Sort By" value="" />
          <Picker.Item label="Due Date" value="dueDate" />
          <Picker.Item label="Priority" value="priority" />
          <Picker.Item label="Status" value="status" />
        </Picker>
      </View>

      <DraxProvider style={styles.draxProvider}>
        <View style={styles.columnsWrapper}>
          <KanbanColumn status="To-Do" data={todo} updateTask={updateTask} deleteTask={deleteTask} allUsers={allUsers} />
          <KanbanColumn status="In Progress" data={inProgress} updateTask={updateTask} deleteTask={deleteTask} allUsers={allUsers} />
          <KanbanColumn status="Done" data={done} updateTask={updateTask} deleteTask={deleteTask} allUsers={allUsers} />
        </View>
      </DraxProvider>

      <TaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddTask={createTask}
        allUsers={allUsers}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginRight: 5,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#5cb85c',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  picker: {
    width: 140,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 10,
  },
  draxProvider: {
    flex: 1,
    marginTop: 10,
  },
  columnsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
