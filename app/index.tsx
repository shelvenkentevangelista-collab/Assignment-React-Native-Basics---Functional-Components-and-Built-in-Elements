import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Button,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import SearchBar from '../components/SearchBar';

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [inputText, setInputText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const sampleData = [
    { id: '1', title: 'First Item', description: 'Description for first item' },
    { id: '2', title: 'Second Item', description: 'Description for second item' },
    { id: '3', title: 'Third Item', description: 'Description for third item' },
  ];

  const handleButtonPress = () => {
    Alert.alert('Button Pressed', `You entered: ${inputText}`);
  };

  const handleShowModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    Alert.alert('Modal Closed', 'The modal has been closed');
  };

  const renderItem = ({ item }: { item: { id: string; title: string; description: string } }) => (
    <View style={styles.listItem}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Home Screen</Text>
        
        <Image
          source={{ uri: 'https://picsum.photos/200/300' }}
          style={styles.image}
          resizeMode="cover"
        />

        <SearchBar 
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search items..."
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sample Items (FlatList):</Text>
          <FlatList
            data={sampleData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.inputSection}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type something..."
          />
          
          <Button
            title="Submit"
            onPress={handleButtonPress}
          />
        </View>

        <TouchableOpacity 
          style={styles.navigationButton}
          onPress={() => router.push('/orders')}
        >
          <Text style={styles.buttonText}>Go to Orders Screen</Text>
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
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  listItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
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