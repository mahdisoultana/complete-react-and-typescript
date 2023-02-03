import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
} from 'react';

type CategoryType = 'water' | 'stone' | 'metal' | 'gaz';
///if we do type vs interface we can have a snapshot preview when we hover over a type declaration
type Product = {
  readonly id: string;
  name: string;
  category: CategoryType;
  price: number;
};

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
      return {
        ...state,
        products: [...state.products, action.product],
      };
    }
    case 'remove': {
      const products = state.products.filter((item) => item.id !== action.id);
      console.log(state, 'remove-render');
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

  const addItem: utilits['addItem'] = useCallback((product: Product) => {
    dispatch({ type: 'add', product });
  }, []);
  const removeItem: utilits['removeItem'] = useCallback((id: string) => {
    dispatch({ type: 'remove', id });
  }, []);
  const setProduct: utilits['setProduct'] = useCallback(
    (products: Product[]) => dispatch({ type: 'set-products', products }),
    [],
  );

  return {
    addItem,
    removeItem,
    products: state.products,
    setProduct,
  };
}
// ----------------------------------------------------------------------

function AddRemoveItemButton({ product }: { product: Product }): ReactElement {
  const { addItem, removeItem } = useProductContext();
  return (
    <>
      <button onClick={() => addItem(product)}>Add {product.name}</button>
      <button
        onClick={() => {
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
const ProductContext = React.createContext<(ProductState & utilits) | null>(
  null,
);
const ProductProvider = ({ children }: { children: ReactNode }) => {
  const state = useProduct();
  return (
    <ProductContext.Provider value={state}>{children}</ProductContext.Provider>
  );
};
const useProductContext = () => {
  const context = React.useContext(ProductContext);
  if (!context)
    throw new Error(
      'useProductContext must used within ♦ <ProductProvider>..</ProductProvider> ',
    );
  return context;
};
export function CardProducts(): ReactElement {
  return (
    <ProductProvider>
      <App />
    </ProductProvider>
  );
}
const App = () => {
  const { products, setProduct } = useProductContext();

  useEffect(() => {
    getProducts().then((products) => {
      setProduct(products);
    });
  }, []);
  return (
    <>
      {products.map((item) => (
        <CardProduct key={item.id} product={item} />
      ))}
    </>
  );
};
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
// eslint-disable-next-line
function exaustiveCheck(action: never): never;
// Implementation signature
function exaustiveCheck(action: ActionType) {
  throw new Error('Unknown action : ' + action.type);
}
