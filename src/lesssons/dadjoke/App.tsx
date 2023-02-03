import { ReactElement } from 'react';
import useFetch from './useFetch';
const url = ' https://icanhazdadjoke.com/';
interface DadJoke {
  id: string;
  joke: string;
  status: number;
}
function DadJoke(): ReactElement {
  const { data, error, loading } = useFetch<DadJoke>({
    url,
    options: {
      headers: {
        Accept: 'application/json',
      },
    },
  });

  if (loading) return <div>loading.....</div>;
  if (error) return <div>{error.message}</div>;
  if (data)
    return (
      <div style={{ marginTop: '1.3rem', textDecoration: 'underline ' }}>
        😆 {data.joke}{' '}
      </div>
    );
  return <div>No Joke Found</div>;
}

export default DadJoke;
