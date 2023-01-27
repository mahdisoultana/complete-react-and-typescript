import React, { ReactElement, useState } from 'react';
interface DeleteButtonProps {
  id: string;
}
function Button({ id }: DeleteButtonProps): ReactElement {
  return (
    <button
      onClick={() => {
        console.log(id);
      }}
    >
      Remove Item
    </button>
  );
}
function AddButton(): ReactElement {
  //   const [num, setNum] = useState(0);
  const [num, setNum] = useState<number>(0);

  return <button onClick={() => setNum(num + 1)}>Add {num}</button>;
}

interface AddButtonProps {
  num: number;
  //   setNum: (cb: number | ((num: number) => void)) => void;
  setNum: React.Dispatch<React.SetStateAction<number>>;
}

function AddButton2({ num, setNum }: AddButtonProps): ReactElement {
  return (
    <button
      onClick={() => {
        setNum((num) => num + 1);
      }}
    >
      Add {num}
    </button>
  );
}
