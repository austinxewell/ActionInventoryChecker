import React, { useEffect, useState } from 'react'


function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3001/api/bins`)
    .then((res) => res.json())
    .then((apiData) => {
      apiData.data.sort((a,b) => Number(a.bin.match(/\d+/)[0])-Number(b.bin.match(/\d+/)[0]));
      setData(apiData.data);
    });
  }, []);

  return (
    <div>
        <h2>Inventory Check List</h2>
        <ul>
          {data.map(binInfo =>
            <li key={binInfo.id}>{binInfo.bin}</li>
          )}
        </ul>
    </div>
  );
}

export default App;
