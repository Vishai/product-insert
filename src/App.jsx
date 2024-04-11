import { useState } from "react";
import SellerInterface from "./pages/SellerInterface";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SellerInterface />
    </>
  );
}

export default App;
