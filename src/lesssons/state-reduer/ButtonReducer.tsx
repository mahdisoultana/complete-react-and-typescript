import { ReactElement } from 'react';

type CategoryType = 'water' | 'stone' | 'metal' | 'gaz';

interface Product {
  readonly id: string;
  name: string;
  category: CategoryType;
  price: number;
}

interface useProductState {
  products: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
}

const addItem: useProductState['addItem'] = (product: Product) =>
  console.log('item added');
const removeItem: useProductState['removeItem'] = (id: string) =>
  console.log('item added');

function useProduct(): useProductState {
  return {
    addItem,
    removeItem,
    products: [{ id: '1', name: 'product 1', category: 'stone', price: 34 }],
  };
}

function AddItem(): ReactElement {
  return <button>Add into Cart</button>;
}
