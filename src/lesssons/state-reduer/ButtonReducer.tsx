import { ReactElement, useEffect, useReducer } from 'react';

type CategoryType = 'water' | 'stone' | 'metal' | 'gaz';

interface Product {
  readonly id: string;
  name: string;
  category: CategoryType;
  price: number;
}

interface ProductState {
  products: Product[];
}
interface utilits {
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  setProduct: (products: Product[]) => void;
}

const intialState: ProductState = {
  products: [],
};
interface AddAction {
  type: 'add';
  product: Product;
}
interface RemoveAction {
  type: 'remove';
  id: string;
}
interface SetProductsAction {
  type: 'set-products';
  products: Product[];
}
type ActionType = AddAction | RemoveAction | SetProductsAction;
// ----------------------------------------------------------------------

function reducer(state: ProductState, action: ActionType): ProductState {
  switch (action.type) {
    case 'add': {
      return { ...state, products: [...state.products, action.product] };
    }
    case 'remove': {
      const products = state.products.filter((item) => item.id !== action.id);
      console.log(state);
      return {
        ...state,
        products,
      };
    }
    case 'set-products': {
      return {
        ...state,
        products: action.products,
      };
    }
    default: {
      const exhaustiveCheck: never = action;
      throw new Error(`Unhandled action case: ${exhaustiveCheck}`);
    }
  }
}
// ----------------------------------------------------------------------

function useProduct(): ProductState & utilits {
  const [state, dispatch] = useReducer(reducer, intialState);

  const addItem: utilits['addItem'] = (product: Product) =>
    dispatch({ type: 'add', product });
  const removeItem: utilits['removeItem'] = (id: string) =>
    dispatch({ type: 'remove', id });
  const setProduct: utilits['setProduct'] = (products: Product[]) =>
    dispatch({ type: 'set-products', products });

  return {
    addItem,
    removeItem,
    products: state.products,
    setProduct,
  };
}
// ----------------------------------------------------------------------

function AddRemoveItemButton({ product }: { product: Product }): ReactElement {
  const { addItem, removeItem } = useProduct();
  return (
    <>
      <button onClick={() => addItem(product)}>Add {product.name}</button>
      <button
        onClick={() => {
          console.log('remove');
          removeItem(product.id);
        }}
      >
        remove {product.name}
      </button>
    </>
  );
}
// ----------------------------------------------------------------------
//root point
export function CardProducts(): ReactElement {
  const { products, setProduct } = useProduct();

  useEffect(() => {
    getProducts().then((products) => {
      setProduct(products);
    });
  }, []);
  console.log({ products });
  return (
    <>
      {products.map((item) => (
        <CardProduct key={item.id} product={item} />
      ))}
    </>
  );
}
// ----------------------------------------------------------------------
function CardProduct({ product }: { product: Product }) {
  return (
    <div key={product.id}>
      <p>{product.name}</p>
      <p>{product.price}</p>
      <p>{product.category}</p>
      <AddRemoveItemButton product={product} />
    </div>
  );
}
function getProducts(): Promise<Product[]> {
  return Promise.resolve([
    { id: '1', name: 'product-1', price: 12, category: 'stone' },
  ]);
}
// exaustive Check
// Externally-visible signature
function exaustiveCheck(action: never): never;
// Implementation signature
function exaustiveCheck(action: ActionType) {
  throw new Error('Unknown action : ' + action.type);
}
