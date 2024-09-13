import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Sets an item in AsyncStorage.
 * @param {string} key - The key under which the value is stored.
 * @param {any} value - The value to store. It will be stringified.
 */
const setLocalStorageItem = async (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error setting item to AsyncStorage:', error);
  }
};

/**
 * Gets an item from AsyncStorage.
 * @param {string} key - The key of the item to retrieve.
 * @returns {Promise<any>} - The parsed value from AsyncStorage, or null if not found.
 */
const getLocalStorageItem = async (key) => {
  try {
    const serializedValue = await AsyncStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  } catch (error) {
    console.error('Error getting item from AsyncStorage:', error);
    return null;
  }
};

/**
 * Removes an item from AsyncStorage.
 * @param {string} key - The key of the item to remove.
 */
const removeLocalStorageItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing item from AsyncStorage:', error);
  }
};

export {
  setLocalStorageItem,
  getLocalStorageItem,
  removeLocalStorageItem,
};
