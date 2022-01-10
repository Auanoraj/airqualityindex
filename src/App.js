import { useEffect, useRef, useState } from "react";
import Loader from "./components/Loader.js";
import Main from "./components/Main.js";

import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cityData, setCityData] = useState([]);

  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("wss://city-ws.herokuapp.com/");
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");

    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    };
  }, []);

  useEffect(() => {
    ws.current.onmessage = (e) => {
      let temp, temp2, index;

      temp = JSON.parse(e.data).map((item) => ({
        ...item,
        lastUpdated: new Date().getTime(),
      }));

      if (!cityData) setCityData([...temp]);
      else {
        temp2 = [...cityData];

        temp.forEach((tl) => {
          index = temp2.findIndex((el) => el.city === tl.city);

          if (index < 0) temp2.push(tl);
          else temp2.splice(index, 1, tl);
        });

        setCityData([...temp2]);
        setIsLoading(false);
      }
    };
  }, [cityData]);

  return (
    <div className="App">
      {isLoading ? <Loader /> : <Main cityData={cityData} />}
    </div>
  );
}

export default App;
