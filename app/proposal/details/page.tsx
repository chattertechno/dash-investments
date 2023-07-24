"use client";
import Link from "next/link";
import { useState } from "react";

const Proposal = () => {
  const [watchList, setWatchList] = useState(false);

  return (
    <main className="p-4 flex flex-col justify-center gap-14 items-center">
      <h1 className="text-3xl text-blue-500 text-center font-semibold">
        Proposal Details
      </h1>
      {/* info */}
      <div className="w-[80%] space-y-2">
        <p>Name: Dash Incubator</p>
        <p>
          Proposal URL:{" "}
          <Link href="https://cool_proposal.com">
            https://cool_proposal.com
          </Link>
        </p>
        <p>Amount: 1000dash</p>
        <p>Yes: 300</p>
        <p>No: 90</p>
        <p>Abstain: 45</p>
        <p>Funded: Yes</p>
      </div>
      {/* button */}
      <div className="w-[80%] flex justify-center">
        {watchList ? (
          <button className="border border-blue-500 text-blue-500 rounded-md px-4 py-2">
            Add to watchlist
          </button>
        ) : (
          <button className="border border-red-500 text-red-500 rounded-md px-4 py-2">
            Remove from watchlist
          </button>
        )}
      </div>
    </main>
  );
};

export default Proposal;
