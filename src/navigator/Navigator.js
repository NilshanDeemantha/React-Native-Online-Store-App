import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Products from '../screens/Products';
import SingleProduct from '../screens/SingleProduct';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: 'white',
				},
			}}>
        <Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Products" component={Products} />
				<Stack.Screen name="SingleProduct" component={SingleProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;