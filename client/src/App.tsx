import { useEffect, useState } from "react";

const App = () => {
  interface BackendData {
    users: string[];
  }

  const [backendData, setBackendData] = useState<BackendData>({ users: [] });

  useEffect(() => {
    fetch("http://localhost:3000/api")
      .then((res) => res.json())
      .then((data) => setBackendData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>React App</h1>
      <p>
        React App with TypeScript. <br /> Backend data below:
      </p>
      <p>
        {typeof backendData.users === "undefined"
          ? "Loading..."
          : backendData.users.map((user: string, index: number) => (
              <div key={index}>{user}</div>
            ))}
      </p>
    </div>
  );
};

export default App;
