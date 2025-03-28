import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { DraxView } from 'react-native-drax';

const TaskCard = React.forwardRef(({ item, deleteTask, allUsers }, ref) => {
  const getUserName = (userId) => {
    const user = allUsers.find((u) => u.id === userId);
    return user ? user.username : 'Unassigned';
  };

  return (
    <DraxView
      style={styles.taskCard}
      draggingStyle={styles.dragging}
      dragPayload={item}
      longPressDelay={150}
      ref={ref}
    >
      <View style={styles.taskCardContent}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskText}>Description: {item.description}</Text>
        <Text style={styles.taskText}>Priority: {item.priority}</Text>
        <Text style={styles.taskText}>Due: {item.dueDate}</Text>
        <Text style={styles.taskText}>Assigned to: {getUserName(item.assignedUserId)}</Text>
        <View style={styles.taskButtonRow}>
          <Button title="Delete" onPress={() => deleteTask(item.id)} color="#d9534f" />
        </View>
      </View>
    </DraxView>
  );
});

export default TaskCard;

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 10,
    marginVertical: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  taskCardContent: {},
  dragging: {
    opacity: 0.3,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  taskText: {
    fontSize: 12,
    color: '#555',
  },
  taskButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});
