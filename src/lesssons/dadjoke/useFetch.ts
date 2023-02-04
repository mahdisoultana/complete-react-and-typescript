import { useEffect, useReducer } from 'react';

interface State<T> {
  loading: boolean;
  data: T | null;
  error: Error | null;
}
type LoadingAction = {
  type: 'loading';
};
type ErrorAction = {
  type: 'error';
  error: Error;
};
type SuccessAction<T> = {
  type: 'success';
  data: T;
};
type FetchActions<T> = LoadingAction | ErrorAction | SuccessAction<T>;

const fetchReducer =
  <T>() =>
  (state: State<T>, action: FetchActions<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...state, loading: true, data: null, error: null };
      case 'error':
        return { ...state, loading: false, data: null, error: action.error };
      case 'success':
        return { ...state, loading: false, data: action.data, error: null };
      default: {
        const exhaustiveCheck: never = action;
        throw new Error(
          'we should never get here with this type' + exhaustiveCheck,
        );
      }
    }
  };
async function fetchData<T>(url: string, options: RequestInit): Promise<T> {
  const jokes = await fetch(url, options).then((res) => res.json());
  return jokes;
}

function useFetch<T>({ url, options }: { url: string; options?: RequestInit }) {
  const reducer = fetchReducer<T>();
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    error: null,
    data: null,
  });
  useEffect(() => {
    dispatch({ type: 'loading' });
    fetchData<T>(url, { ...options })
      .then((res) => {
        dispatch({ type: 'success', data: res });
      })
      .catch((error) => dispatch({ type: 'error', error }));
  }, [url]);
  return state;
}

export default useFetch;
