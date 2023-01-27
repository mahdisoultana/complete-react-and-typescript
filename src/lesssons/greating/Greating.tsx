import { ReactElement } from 'react';

function Greating({ name }: { name: string }): ReactElement {
  return <div>Greating {name}</div>;
}

export default Greating;
