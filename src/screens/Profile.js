import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getLocalStorageItem } from '../utils/localeStorage';
import Header from '../components/Header';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
	const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
			setLoading(true);
      try {
        const userId = await getLocalStorageItem('userId');
        if (!userId) {
          throw new Error('User ID not found in local storage');
        }

        const response = await fetch(`https://fakestoreapi.com/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

	const handleInputChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
    setIsChanged(true);
    validateField(field, value);
  };

  const handleNameChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      name: {
        ...prevUser.name,
        [field]: value,
      },
    }));
    setIsChanged(true);
    validateField(field, value);
  };

  const validateField = (field, value) => {
    let error = '';
    if (!value.trim()) {
      error = 'This field is required';
    } else {
      switch (field) {
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            error = 'Invalid email address';
          }
          break;
        case 'password':
          if (value.length < 4) {
            error = 'Password must be at least 4 characters';
          }
          break;
        default:
          break;
      }
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));
  };

  const handleSave = async () => {
		setLoading(true);
    try {
      const response = await fetch(`https://fakestoreapi.com/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Failed to update user details');
      }

      Alert.alert('Success', 'User details updated successfully');
      setIsChanged(false);
    } catch (error) {
      console.error('Error updating user details:', error);
      Alert.alert('Error', 'Failed to update user details');
    } finally {
			setLoading(false);
		}
  };

	if (loading) {
		return (
			<View style={styles.overlay}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

  if (!user) {
    return <Text>Error loading user details</Text>;
  }

  return (
		<>
			<Header title="Profile" shouldShowProfile={false} />
			<View style={styles.container}>
				<Text style={styles.label}>First Name</Text>
				<TextInput
					style={styles.input}
					value={user.name.firstname}
					onChangeText={(value) => handleNameChange('firstname', value)}
				/>
				{errors.firstname && <Text style={styles.error}>{errors.firstname}</Text>}
				
				<Text style={styles.label}>Last Name</Text>
				<TextInput
					style={styles.input}
					value={user.name.lastname}
					onChangeText={(value) => handleNameChange('lastname', value)}
				/>
				{errors.lastname && <Text style={styles.error}>{errors.lastname}</Text>}
				
				<Text style={styles.label}>Username</Text>
				<TextInput
					style={styles.input}
					value={user.username}
					onChangeText={(value) => handleInputChange('username', value)}
				/>
				{errors.username && <Text style={styles.error}>{errors.username}</Text>}
				
				<Text style={styles.label}>Email</Text>
				<TextInput
					style={styles.input}
					value={user.email}
					onChangeText={(value) => handleInputChange('email', value)}
				/>
				{errors.email && <Text style={styles.error}>{errors.email}</Text>}
				
				<Text style={styles.label}>Password</Text>
				<TextInput
					style={styles.input}
					value={user.password}
					secureTextEntry
					onChangeText={(value) => handleInputChange('password', value)}
				/>
				{errors.password && <Text style={styles.error}>{errors.password}</Text>}
				
				<Button
					title="Save"
					onPress={handleSave}
					disabled={!isChanged || Object.values(errors).some((error) => error)}
				/>
			</View>
		</>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
	error: {
    color: 'red',
    marginBottom: 10,
  },
	overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Profile;