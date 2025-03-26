import { useEffect, useState } from "react";
import "./App.css";
import ChildA from "./ChildA";
function App() {
  const name = "Yash";

  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1); 
    }, 5000);

    return () => clearInterval(interval); 
  }, []);
  
  return (
    <div className="container">
      <h2><span>Parsed Number: </span>{parseInt("42")}</h2>

      <h2>Counter: {count}</h2> {/* Displaying the counter */}

    <div className="paragraph1">
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab obcaecati
        officia quis debitis explicabo, dolorum vel sunt, facere beatae
        laboriosam, omnis sequi aliquid! Adipisci, voluptate consectetur quam
        ipsum distinctio impedit porro nesciunt ratione minus quasi tenetur
        ipsam expedita! Ut doloribus non vero libero, modi dolor! Dolorem rerum
        maiores quia ratione?
      </p>
      <img
        src="https://wallpapercave.com/wp/wp8903914.jpg"
        width="400"
        height="220"
        style={{ margin: "7px" }}
        alt="Wallpaper"
      />
      <img
        src="https://wallpapercave.com/wp/wp8903944.jpg"
        width="400"
        height="220"
        style={{ margin: "7px" }}
        alt="Wallpaper"
      />
      <img
        src="https://wallpapercave.com/wp/wp8903948.jpg"
        width="400"
        height="220"
        style={{ margin: "7px" }}
        alt="Wallpaper"
      />
      <div className="container">
        <h1>Prop Drilling</h1>
        <ChildA name={name} />
      </div>
    </div>
    </div>
  );
}

export default App;
