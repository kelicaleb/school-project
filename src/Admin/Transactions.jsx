import { useState } from 'react';
 




function Transactions() {
  // Sample data for the table
  const [data, setData] = useState([
    { id: 1, name: "Product A", category: "Electronics", price: "$299", stock: 45, status: "Available" },
    { id: 2, name: "Product B", category: "Clothing", price: "$59", stock: 12, status: "Low Stock" },
    { id: 3, name: "Product C", category: "Home", price: "$129", stock: 0, status: "Out of Stock" },
    { id: 4, name: "Product D", category: "Electronics", price: "$499", stock: 8, status: "Low Stock" },
    { id: 5, name: "Product E", category: "Books", price: "$19", stock: 32, status: "Available" },
    { id: 5, name: "Product E", category: "Books", price: "$19", stock: 32, status: "Available" },
    { id: 5, name: "Product E", category: "Books", price: "$19", stock: 32, status: "Available" },
    { id: 5, name: "Product E", category: "Books", price: "$19", stock: 32, status: "Available" },
    { id: 5, name: "Product E", category: "Books", price: "$19", stock: 32, status: "Available" },
    { id: 5, name: "Product E", category: "Books", price: "$19", stock: 32, status: "Available" },
    { id: 5, name: "Product E", category: "Books", price: "$19", stock: 32, status: "Available" },

  ]);

  return (
    <div className="absolute h-[20rem] top-[60rem] w-[78rem] overflow-scroll shadow-md rounded-lg ">
      <table className="min-w-full bg-white ">
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
          {data.map((row) => (
            <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">{row.id}</td>
              <td className="py-3 px-6 text-left font-medium">{row.name}</td>
              <td className="py-3 px-6 text-left">{row.category}</td>
              <td className="py-3 px-6 text-left">{row.price}</td>
              <td className="py-3 px-6 text-center">{row.stock}</td>
              <td className="py-3 px-6 text-center">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  row.status === 'Available' ? 'bg-green-200 text-green-800' : 
                  row.status === 'Low Stock' ? 'bg-yellow-200 text-yellow-800' : 
                  'bg-red-200 text-red-800'
                }`}>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Transactions