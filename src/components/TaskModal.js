import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function TaskModal({ visible, onClose, onAddTask, allUsers }) {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState('Low');
  const [newAssigned, setNewAssigned] = useState(null);
  
  // console.log(new Date().toISOString().split('T'));
  
  const handleAddTask = () => {
    if (!newTitle.trim()) return;
    onAddTask({
      title: newTitle.trim(),
      description: newDescription.trim(),
      priority: newPriority,
      status: 'To-Do',
      dueDate: new Date().toISOString().split('T')[0],
      assignedUserId: newAssigned ? parseInt(newAssigned, 10) : null,
    });
    setNewTitle('');
    setNewDescription('');
    setNewPriority('Low');
    setNewAssigned(null);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Create New Task</Text>
          <TextInput
            style={styles.input}
            placeholder="Task Title"
            value={newTitle}
            onChangeText={setNewTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Task Description"
            value={newDescription}
            onChangeText={setNewDescription}
          />
          <Picker
            style={styles.picker}
            selectedValue={newPriority}
            onValueChange={(val) => setNewPriority(val)}
          >
            <Picker.Item label="Low" value="Low" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="High" value="High" />
          </Picker>
          <Picker
            style={styles.picker}
            selectedValue={newAssigned}
            onValueChange={(val) => setNewAssigned(val)}
          >
            <Picker.Item label="Assign to User..." value={null} />
            {allUsers.map((u) => (
              <Picker.Item key={u.id} label={u.username} value={u.id.toString()} />
            ))}
          </Picker>
          <View style={styles.modalButtonRow}>
            <Button title="Cancel" onPress={onClose} color="#d9534f" />
            <Button title="Add Task" onPress={handleAddTask} color="#5cb85c" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 10,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
