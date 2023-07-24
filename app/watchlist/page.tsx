"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

let count = 1;

export default function WatchList() {
  // const data = [
  //   {
  //     name: "Dash Incubator",
  //     date: "2023-06-21",
  //   },
  //   {
  //     name: "XYZ Corporation",
  //     date: "2023-06-19",
  //   },
  //   {
  //     name: "ABC Industries",
  //     date: "2023-06-18",
  //   },
  //   {
  //     name: "PQR Ventures",
  //     date: "2023-06-20",
  //   },
  //   {
  //     name: "Acme Innovations",
  //     date: "2023-06-17",
  //   },
  //   {
  //     name: "EFG Holdings",
  //     date: "2023-06-15",
  //   },
  //   {
  //     name: "LMN Solutions",
  //     date: "2023-06-16",
  //   },
  //   {
  //     name: "GHI Enterprises",
  //     date: "2023-06-23",
  //   },
  //   {
  //     name: "RST Industries",
  //     date: "2023-06-22",
  //   },
  //   {
  //     name: "UVW Ventures",
  //     date: "2023-06-24",
  //   },
  // ];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [watchLists, setWatchLists] = useState<string[]>([]);

  // getting watch list from local storage on page load
  useEffect(() => {
    const watchListFromLocalStorage = localStorage.getItem("RID-watchList");

    if (watchListFromLocalStorage) {
      setWatchLists(JSON.parse(watchListFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const fetchProposals = async (watchLists: string[]) => {
      try {
        const fetchedProposals = await Promise.all(
          watchLists.map(hash => fetchProposal(hash))
        );
        setData(fetchedProposals.filter(proposal => proposal !== null));
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching proposals:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchProposals(watchLists);
  }, [watchLists]);

  // fetching proposal from dash central api
  const fetchProposal = async (hash: string) => {
    try {
      const response = await axios.get(
        `https://www.dashcentral.org/api/v1/proposal?hash=${hash}`
      );
      const { proposal } = response.data;

      return proposal;
    } catch (error) {
      console.error(`Error fetching proposal for hash ${hash}:`, error);
      setError(true);
      return null;
    }
  };


  return (
    <main className="p-4 flex flex-col justify-center gap-14 items-center">
      <h1 className="text-3xl text-blue-500 text-center font-semibold">
        Watch List
      </h1>
      {/* data */}
      <div className="w-[90%] md:w-[60%]">
        {loading ? (
          <p>Fetching proposals...</p>
        ) : error ? (
          <p>Failed to fetch data</p>
        ) : data.length < 1 ? (
          <p>No projects added to watch list, please add some</p>
        ) : (
          data && <Table data={data} />
        )}
      </div>
      {/* button */}
      <div className="w-[80%] flex justify-center">
        <Link
          href="/add-address"
          className="border border-blue-500 text-blue-500 rounded-md px-4 py-2"
        >
          Add Address
        </Link>
      </div>
    </main>
  );
}

const Table = ({ data }: { data: any[] }) => {
  return (
    <table className="border border-gray-500 w-full">
      <thead>
        <tr>
          <th className="border border-gray-500 p-2">Name</th>
          <th className="border border-gray-500 p-2">Added at</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          // Convert the "date_added" property to a plain date without time
          const itemDate = new Date(item.date_added).toLocaleDateString();

          return (
            <tr key={index}>
              <td className="border border-gray-500 p-2">{item.title}</td>
              <td className="border border-gray-500 p-2 text-center">
                {itemDate}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
