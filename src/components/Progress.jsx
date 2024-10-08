import React from "react";
import GaugeChart from "../components/charts/GaugeChart"; // Make sure the path is correct
import SplineChart from "../components/charts/Splinechart"; // Import the SplineChart component

const Progress = () => {
  // Dummy data for the SplineChart
  const seriesData = [
    {
      name: "Your Performance",
      data: [45, 60, 50, 70, 80, 60, 75], // Example data
    },
    {
      name: "Year 1 Students",
      data: [50, 65, 55, 75, 85, 65, 78], // Example data
    },
  ];

  const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]; // Example categories

  const colors = ["#FF5733", "#3498DB"]; // Example colors for the chart

  return (
    <>
      <h2 className="text-2xl font-semibold text-primary mt-10 mb-6">
        Progress
      </h2>

      <div className="bg-white rounded-xl p-6 mb-30">
        {/* Time Filter Dropdown */}
        <div className="mt-6 flex justify-end">
          <button className="bg-white border border-[#007AFF] text-[#007AFF] font-semibold text-[12px] px-4 py-2 rounded-md">
            This week
          </button>
        </div>

        {/* Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10 justify-center">
          {/* Left side: Two circular charts */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* Performance (without difficulty) */}
            <div className="text-center">
              <p className="text-[#343A40] text-title-sm font-semibold">
                Performance
              </p>
              {/* <p className="text-title-p text-[#343A40] font-semibold">
                (without difficulty)
              </p> */}
              <GaugeChart series={[60]} />
              <p className="text-[#8D8D8D] font-semibold text-sm mt-4 ">
                Performance NOT adjusted to question difficulty
              </p>
            </div>

            {/* Weighted Performance (with difficulty) */}
            {/* <div className="text-center">
              <p className="text-[#343A40] text-title-sm font-semibold">
                Weighted Performance
              </p>
              <p className="text-title-p text-[#343A40] font-semibold">
                (with difficulty)
              </p>
              <GaugeChart series={[74]} />
              <p className="text-[#8D8D8D] font-semibold text-sm mt-4 ">
                Performance adjusted to question difficulty
              </p>
            </div> */}
          </div>

          {/* Right side: SplineChart comparison */}
          <div className="lg:w-full ">
            <h3 className="text-[#343A40] text-title-sm font-semibold">
              Performance compared to Year 1 students
            </h3>

            {/* SplineChart integration */}
            <SplineChart
              series={seriesData}
              categories={categories}
              colors={colors}
            />

            <p className="text-center mt-4 text-black text-title-p font-medium">
              <span className="font-bold">55%</span> of the population scored
              above your level.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Progress;
