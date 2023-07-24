"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Proposal() {
  const [data, setData] = useState([])
  const fetchData = async() => {
    axios.get('https://www.dashcentral.org/api/v1/budget').then((data) => {

      setData(data.data.proposals)
      return data.data;
    })
  }
  useEffect(() => {
    fetchData()
  }, [])
 

  return (
    <main className="p-4 flex flex-col justify-center gap-14 items-center">
      <h1 className="text-3xl text-blue-500 text-center font-semibold">
        Budget Proposal
      </h1>
      {/* data */}
      <div className="w-[100vw] md:w-[80%] overflow-x-auto px-4 md:px-0">
        <Table data={data} />
      </div>
    </main>
  );
}

const Table = ({ data }: { data: any[] }) => {
  return (
    <table className="border border-gray-500 w-full text-sm">
      <thead>
        <tr>
          <th className="border border-gray-500 p-2">Name</th>
          <th className="border border-gray-500 p-2">Amount</th>
          <th className="border border-gray-500 p-2">Yes</th>
          <th className="border border-gray-500 p-2">No</th>
          <th className="border border-gray-500 p-2">Abstain</th>
          <th className="border border-gray-500 p-2">Funded</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="border border-gray-500 p-2">{item.name}</td>
            <td className="border border-gray-500 p-2">{item.monthly_amount} Dash</td>
            <td className="border border-gray-500 p-2">{item.yes}</td>
            <td className="border border-gray-500 p-2">{item.no}</td>
            <td className="border border-gray-500 p-2">{item.abstain}</td>
            <td className="border border-gray-500 p-2">{item.will_be_funded.toString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
