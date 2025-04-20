import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Transactions() {
  // State for transaction data
  const [data, setData] = useState([]);
  const [control, setControl] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await axios.get("http://localhost:8000/tableTransaction");
        setData(response.data);
        console.log("this is data", response.data);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
      return setControl(true);
    };
    
    fetchData();
  }, [control]);

  return (
    <div className="absolute h-[20rem] top-[60rem] w-[78rem] overflow-scroll shadow-md rounded-lg">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal sticky top-0 z-10">
            <th className="py-3 px-6 text-left sticky">TransactionId</th>
            <th className="py-3 px-6 text-left">Username</th>
            <th className="py-3 px-6 text-left">Item</th>
            <th className="py-3 px-6 text-left">Amount</th>
            <th className="py-3 px-6 text-center">Method</th>
            <th className="py-3 px-6 text-center">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {data.flatMap(row => 
            row.transactions.map(transaction => (
              <tr key={transaction.transactionid} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{transaction.transactionid}</td>
                <td className="py-3 px-6 text-left font-medium">{row.username}</td>
                <td className="py-3 px-6 text-left">{transaction.item}</td>
                <td className="py-3 px-6 text-left">{transaction.amount}</td>
                <td className="py-3 px-6 text-center">{transaction.method}</td>
                <td className="py-3 px-6 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    transaction.status === 'Confirmed' ? 'bg-green-200 text-green-800' :
                    transaction.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;