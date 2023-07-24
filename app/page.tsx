"use client";

import axios from "axios";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { ReactNode, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [proposals, setProposals] = useState([]);

  const fetchDashCentralBudget = async () => {
    // setLoading(true);
    // await axios
    try {
      await axios
        .get("https://www.dashcentral.org/api/v1/budget")
        .then(async data => {
          console.log(data.data);
          const final = await data.data.proposals;
          setProposals(final);
          return final;
        });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDashCentralBudget();
  }, []);

  console.log("🚀 ~ file: page.tsx:14 ~ Home ~ proposals:", proposals);

  function generateRandomHex() {
    const characters = "0123456789ABCDEF";
    let hex = "#";

    for (let i = 0; i < 6; i++) {
      hex += characters[Math.floor(Math.random() * 16)];
    }

    return hex;
  }

  const data = {
    labels: proposals.map((proposal: any) => proposal.name),
    datasets: [
      {
        label: "Dash Monthly Amount",
        data: proposals.map((proposal: any) => proposal.monthly_amount),
        backgroundColor: proposals.map((proposal: any) => generateRandomHex()),
        hoverOffset: 4,
      },
    ],
  };


  const pieChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <main className="p-4 flex flex-col justify-center gap-14 items-center">
      {loading ? (
        <div className="text-2xl">Loading...</div>
      ) : error ? (
        <div className="text-2xl">There is an error, please refresh</div>
      ) : (
        <>
          <h1 className="text-3xl text-blue-500 text-center font-semibold">
            Investment Data
          </h1>
          {/* data */}
          <div className="flex md:gap-14 px-4 md:p-0">
            {/* pie chart */}
            <div className="">
              {/* <Image src="assets/piechart.svg" width={300} height={300} alt="" /> */}
              <div style={{ width: "400px", height: "400px" }}>
                <Pie data={data} options={pieChartOptions} />
              </div>
            </div>
            {/* chart details  */}
            <div className="flex items-center">
              {/* <Image
            src="assets/chart-details.svg"
            width={300}
            height={300}
            alt=""
          /> */}
            </div>
            {/* buttons  */}
            <div className="hidden md:flex gap-8 justify-center flex-col">
              <Button onClick={() => {}}>Generate Report</Button>
              <Button onClick={() => {}}>Export to Excel</Button>
              <Button onClick={() => {}}>Download .csv</Button>
            </div>
          </div>
          {/* date range  */}
          <div className="flex flex-col gap-4 mt-8">
            <p className="text-center">Choose period</p>
            <div className="flex gap-10">
              <div className="flex flex-col items-center gap-2">
                <label htmlFor="from">From</label>
                <input
                  type="date"
                  name="date-range"
                  id="from"
                  className="border border-blue-500 rounded p-2"
                />
              </div>
              <div className="flex flex-col items-center gap-2">
                <label htmlFor="to">To</label>
                <input
                  type="date"
                  name="date-range"
                  id="to"
                  className="border border-blue-500 rounded p-2"
                />
              </div>
            </div>
          </div>
          {/* buttons  */}
          <div className="md:hidden space-y-8">
            <div className="flex flex-col items-center gap-2">
              <p>Report</p>
              <Button onClick={() => {}}>Generate Report</Button>
            </div>
            <div className="space-y-2">
              <p className="text-center">Export</p>
              <div className="space-x-4">
                <Button onClick={() => {}}>Export to Excel</Button>
                <Button onClick={() => {}}>Download .csv</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

const Button = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="p-3 px-4 rounded border border-blue-500 text-blue-500"
  >
    {children}
  </button>
);
