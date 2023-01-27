import { useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <a href="https://www.typescriptlang.org/" target="_blank">
          <img
            src="/typescript.svg"
            className="logo typescript"
            alt="typescript logo"
          />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React + Typescript</h1>
      <div className="card">
        <p>
          Edit <code>src/**/*.tsx</code> and see how TS Complaining
        </p>
      </div>
    </div>
  );
}

export default App;
