import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Header from '../components/Header';

const productImg =  require('../../assets/images/product.jpeg')


const SingleProduct = () => {
  const route = useRoute();
  const { product } = route.params;

  return (
    <>
      <Header title="Product Details" />
      <View style={styles.container}>
        <Swiper style={styles.wrapper} showsButtons={true} dotColor="#ccc" activeDotColor="#000">
          {product.images.map((image, index) => (
            <Image key={index} source={productImg} style={styles.image} />
          ))}
        </Swiper>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.categoryContainer}>
          <Image source={{ uri: product.category.image }} style={styles.categoryImage} />
          <Text style={styles.categoryName}>{product.category.name}</Text>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  categoryName: {
    fontSize: 18,
    color: '#666',
  },
});

export default SingleProduct;