import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(() => {
    return 0;
  });

  const feedback = count > 10 ? "It's higher than 10!" : "Keep counting...";

  const add1 = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      <div style={{ margin: 40 }}>
        <Count count={count} /> <span>{feedback}</span> <Button add1={add1} />
      </div>
    </>
  );
};

const Button = ({ add1 }) => {
  return <button onClick={add1}>Add 1</button>;
};

const Count = ({ count }) => {
  return <span>{count}</span>;
};

function App() {
  return <Counter />;
}

export default App;
