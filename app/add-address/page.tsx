"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

// 720fd1a1fa957b18d8e0649b31a02d21dc1d54aaaa770fec7c7ef4e23bbc1bb2
// 125f31764e1abfd808db25c9526e51e089674a1423e9bde939211ce127609773
// 30cac78c2c3dab4e0c1451a71f3b66455c4af6b1301988f1f8a0e2286a8b8010

const AddAddress = () => {
  const [dashAddress, setDashAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [watchLists, setWatchLists] = useState<string[]>([]);

  // setting up local storage for watch list and clear succeed message
  useEffect(() => {
    if (watchLists.length > 0) {
      localStorage.setItem("RID-watchList", JSON.stringify(watchLists));
    }
    setTimeout(() => setSucceeded(false), 3000);
  }, [succeeded, watchLists]);

  // getting watch list from local storage on page load
  useEffect(() => {
    const watchListFromLocalStorage = localStorage.getItem("RID-watchList");

    if (watchListFromLocalStorage) {
      setWatchLists(JSON.parse(watchListFromLocalStorage));
    }
  }, []);

  // fetching proposal from dash central api
  const fetchProposal = useCallback(async (hash: any) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.dashcentral.org/api/v1/proposal?hash=${hash}`
      );

      if (response.data.status === "error") throw new Error("Not a valid hash");

      const { proposal } = await response.data;

      const newItem = proposal.hash;

      setWatchLists(prevWatchLists => {
        // Check if the new item already exists in the array
        if (!prevWatchLists.includes(newItem)) {
          // Add the new item to the array
          return [...prevWatchLists, newItem];
        }

        // If the new item already exists, return the previous array
        return prevWatchLists;
      });

      setSucceeded(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("Not a Valid Hash");
    }
  }, []);

  const handleAddToWatchList = async () => {
    await fetchProposal(dashAddress);
  };

  return (
    <main className="p-8 flex flex-col gap-8 items-start">
      {/* <h1 className="text-3xl text-blue-500 text-center font-semibold">
        AddAddress Details
      </h1> */}
      {/* info */}
      <div className="w-[90%] md:w-[80%] flex flex-col gap-4 mt-8">
        <p>Enter proposal hash to add proposal to watch list</p>
        <input
          type="text"
          name="dash-address"
          value={dashAddress}
          onChange={e => setDashAddress(e.target.value)}
          id="dash-address"
          className="border border-blue-500 rounded p-2"
        />
      </div>

      {/* button  */}
      <>
        <button
          className="border border-blue-500 text-blue-500 rounded-md px-4 py-2"
          onClick={handleAddToWatchList}
        >
          Add to watch list
        </button>
      </>

      {/* loader */}
      <>{loading && <p>Loading...</p>}</>
      {/* loader */}
      <>{succeeded && <p>Added to watch list</p>}</>
    </main>
  );
};

export default AddAddress;
