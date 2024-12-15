import React, { useEffect, useState } from 'react';

const AllDataPage: React.FC = () => {
  const [data, setData] = useState<{int_field: number, string_field: string}[]>([]);
  const [intValue, setIntValue] = useState('');
  const [stringValue, setStringValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/data')
      .then(res => res.json())
      .then(rows => setData(rows))
      .catch(err => setError(err.message));
  }, []);

  const handleSubmit = async () => {
    setError('');
    const parsedInt = parseInt(intValue, 10);
    if (isNaN(parsedInt) || stringValue.trim() === '') {
      setError('Invalid input');
      return;
    }

    const res = await fetch('http://localhost:8080/api/data', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({intValue: parsedInt, stringValue})
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Error inserting data');
    } else {
      setIntValue('');
      setStringValue('');
      // Refresh data
      const rows = await fetch('http://localhost:8080/api/data').then(r=>r.json());
      setData(rows);
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">All Data</h1>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-secondary text-background">
            <th className="border p-2">Integer Field</th>
            <th className="border p-2">String Field</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td className="border p-2">{row.int_field}</td>
              <td className="border p-2">{row.string_field}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Integer"
          className="border p-1 mr-2"
          value={intValue}
          onChange={e => setIntValue(e.target.value)}
        />
        <input
          type="text"
          placeholder="String"
          className="border p-1 mr-2"
          value={stringValue}
          onChange={e => setStringValue(e.target.value)}
        />
        <button onClick={handleSubmit} className="bg-primary text-background p-2 rounded">Add Data</button>
      </div>
    </div>
  );
};

export default AllDataPage;
