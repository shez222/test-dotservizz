import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { DraxView } from 'react-native-drax';
import TaskCard from './TaskCard';

export default function KanbanColumn({ status, data, updateTask, deleteTask, allUsers }) {
  const renderTaskCard = ({ item }) => (
    <TaskCard item={item} deleteTask={deleteTask} allUsers={allUsers} />
  );

  return (
    <DraxView
      style={styles.column}
      receivingStyle={styles.columnReceiving}
      onReceiveDragDrop={({ dragged: { payload } }) => {
        updateTask({ ...payload, status });
      }}
    >
      <View style={styles.columnContent}>
        <Text style={styles.columnTitle}>{status}</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTaskCard}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </DraxView>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    backgroundColor: '#e9ecef',
    borderRadius: 6,
    padding: 8,
    marginHorizontal: 4,
    minHeight: 300,
  },
  columnReceiving: {
    backgroundColor: '#d4edda',
  },
  columnContent: {
    flex: 1,
  },
  columnTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
});
