import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Button,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    SectionList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import SearchBar from '../components/SearchBar';

export default function OrdersScreen() {
  const [searchText, setSearchText] = useState('');
  const [inputText, setInputText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const sectionData = [
    {
      title: 'Pending Orders',
      data: [
        { id: '1', name: 'Order #123', status: 'Pending' },
        { id: '2', name: 'Order #124', status: 'Pending' },
      ],
    },
    {
      title: 'Completed Orders',
      data: [
        { id: '3', name: 'Order #120', status: 'Completed' },
        { id: '4', name: 'Order #121', status: 'Completed' },
        { id: '5', name: 'Order #122', status: 'Completed' },
      ],
    },
  ];

  const handleButtonPress = () => {
    Alert.alert('Order Action', `Processing order: ${inputText}`);
  };

  const handleShowModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    Alert.alert('Modal Closed', 'The modal has been closed');
  };

  const renderSectionHeader = ({ section }: { section: { title: string } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  const renderItem = ({ item }: { item: { id: string; name: string; status: string } }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderName}>{item.name}</Text>
      <Text style={[styles.orderStatus, 
        { color: item.status === 'Pending' ? '#FF9500' : '#34C759' }
      ]}>{item.status}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Orders Screen</Text>

        <SearchBar 
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search orders..."
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order List (SectionList):</Text>
          <SectionList
            sections={sectionData}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.inputSection}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Enter order ID"
          />
          
          <Button
            title="Process Order"
            onPress={handleButtonPress}
          />
        </View>

        <TouchableOpacity 
          style={styles.navigationButton}
          onPress={() => router.push('/')}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.modalButton}
          onPress={handleShowModal}
        >
          <Text style={styles.buttonText}>Show Modal</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>This is a modal</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={handleCloseModal}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  sectionHeader: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginTop: 10,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '600',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 5,
    marginLeft: 10,
  },
  orderName: {
    fontSize: 16,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  inputSection: {
    marginVertical: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  navigationButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  modalButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});