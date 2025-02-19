import { NavigatorScreenParams } from '@react-navigation/native';

export type CollectionStackParamList = {
  ProductList: undefined;
  ProductDetails: { id: string };
};

export type CartStackParamList = {
  Cart: undefined;
};

export type RootTabParamList = {
  Collection: NavigatorScreenParams<CollectionStackParamList>;
  Cart: NavigatorScreenParams<CartStackParamList>;
};
