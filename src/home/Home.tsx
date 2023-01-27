import * as React from 'react';
import './Home.css';
interface HomeProps {
  children: React.ReactNode;
}
function Home({ children }: HomeProps) {
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
          <img src="/react.svg" className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React + Typescript</h1>
      <div className="card">
        <p>
          Edit <code>src/**/*.tsx</code> and see how TS Complaining
        </p>
      </div>
      {children}
    </div>
  );
}

export default Home;
