import React from 'react'
import AdminNavbar from './AdminNavbar'
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Transactions from './Transactions'




function AdminHome(){
    //data Pie chart 
    const data = [
        { label: 'Group A', value: 400, color: '#0088FE' },
        { label: 'Group B', value: 300, color: '#00C49F' },
        { label: 'Group C', value: 300, color: '#FFBB28' },
        { label: 'Group D', value: 200, color: '#FF8042' },
      ];
      //data pie chart 
      const sizing = {
        margin: { right: 5 },
        width: 200,
        height: 200,
        hideLegend: true,
      };
      //data pie chart 
      const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
      // data piechart 
      
      const getArcLabel = (params) => {
        const percent = params.value / TOTAL;
        return `${(percent * 100).toFixed(0)}%`;
      };
    return(
        <>
         <AdminNavbar/>
        <div className="grid grid-cols-2">
        <div className=" w-[38rem] pt-20 mt-20 border rounded-lg shadow-2xl shadow-gray-400 hover:-translate-y-2 hover:shadow-gray-500 ">
        <h1 className="font-bold font-serif text-xl">Sell by Category</h1>
         <BarChart
      series={[
        { data: [35, 44, 24, 34] },
        { data: [51, 6, 49, 30] },
        { data: [15, 25, 30, 50] },
        { data: [60, 50, 15, 25] },
      ]}
      height={290}
      xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
    />   
         </div>
         <div className=" hover:-translate-y-2 shadow-2xl pt-20 mt-20 shadow-gray-400 hover:shadow-gray-500 border w-[36rem]">
            <h1 className="font-seirf font-bold text-xl">Total Sales</h1>
         <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
        },
      ]}
      height={300}
    />
         </div>
        </div>
       <div className="top-[32rem] absolute right-0 left-12">
       <div className=" rounded-md h-[17rem] w-[32rem] mt-12 ml-[25rem] border shadow-2xl shadow-gray-400  hover:shadow-gray-500 hover:-translate-y-2 relative items-center justify-center pt-4">  
            <h1 className="font-bold font-serif text-xl pt-2">Store Products</h1>  
        <PieChart
      series={[
        {
          outerRadius: 80,
          data,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
      {...sizing}/> </div>
       </div>
       <div>
        <Transactions/>
       </div>
    </>
    )
}


export default AdminHome