import React, {
  useState,
  useEffect,
} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { getLocalStorageItem, removeLocalStorageItem } from '../utils/localeStorage';

const Header = ({ title, shouldShowProfile = true }) => {
  const [initials, setInitials] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  
  useEffect(() => {
    const fetchUserInitials = async () => {
      try {
        const firstName = await getLocalStorageItem('firstName');
        const lastName = await getLocalStorageItem('lastName');
        if (firstName && lastName) {
          const firstInitial = firstName.charAt(0).toUpperCase();
          const lastInitial = lastName.charAt(0).toUpperCase();
          setInitials(`${firstInitial}${lastInitial}`);
        }
      } catch (error) {
        console.error('Error fetching user initials:', error);
      }
    };

    fetchUserInitials();
  }, []);

  const onSignOut = async () => {
    try {
      await removeLocalStorageItem('userId');
      await removeLocalStorageItem('firstName');
      await removeLocalStorageItem('lastName');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      "Confirm Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "destructive"
        },
        {
          text: "OK",
          style: "default",
          onPress: () => navigation.navigate('Home')
        }
      ],
      { cancelable: false }
    );
  };

  const handleProfile = () => {
    setModalVisible(false);
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{title}</Text>
      {!modalVisible && (
        <View style={styles.userContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.initialsCircle}>
              <Text style={styles.initialsText}>{initials}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {shouldShowProfile && (
                <TouchableOpacity style={styles.option} onPress={handleProfile}>
                  <Icon name="person" size={24} color="black" />
                  <Text style={styles.optionText}>Profile</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.option} onPress={handleSignOut}>
                <Icon name="logout" size={24} color="black" />
                <Text style={styles.optionText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  initialsCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    marginTop: 10, // Adjust this value to position the modal below the header
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: 200,
  },
  modalContent: {
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 15,
    width: '100%',
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default Header;