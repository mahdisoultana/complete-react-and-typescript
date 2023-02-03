import useFetch from './useFetch';
const url = ' https://icanhazdadjoke.com/';
interface DadJoke {
  id: string;
  joke: string;
  status: number;
}
function DadJoke() {
  const { data, error, loading } = useFetch<DadJoke>({
    url,
    options: {
      headers: {
        Accept: 'application/json',
      },
    },
  });
  console.log({ data, error, loading });

  return <div>App</div>;
}

export default DadJoke;
