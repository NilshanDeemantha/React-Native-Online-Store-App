import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from '../components/Header';

const SingleProduct = () => {
  const route = useRoute();
  const { product } = route.params;

  return (
    <>
      <Header title="Product Details" />
      <View style={styles.container}>
        <Image source={{ uri: product.image}} style={styles.image} />
        <ScrollView>
          <Text style={styles.title}>{product.title}</Text>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryName}>{product.category.toUpperCase()}</Text>
          </View>
          <Text style={styles.price}>{product.price} $</Text>
          <Text style={styles.description}>{product.description}</Text>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  wrapper: {
    height: 300,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 5,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 5,
  },
  categoryContainer: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SingleProduct;