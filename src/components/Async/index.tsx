import { useEffect, useState } from "react";

export function Async() {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {

    }, 1000);
  }, []);

  return (
    <div>
      <div>Async</div>
      { !isButtonVisible && <button>Button</button> }
    </div>
  );
}