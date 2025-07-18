import React, { useState } from "react";
import BarChart from "./BarChart";

const ReportsPage = () => {
  const [report, setReport] = useState("age");

  const reportsMap = {
    age: {
      endpoint: "http://localhost:9000/report/api/reports/age-distribution",
      title: "Vaccinated Users by Age Group",
      xLabel: "Age Group",
      yLabel: "Users"
    },
    gender: {
      endpoint: "http://localhost:9000/report/api/reports/gender-distribution",
      title: "Vaccinated Users by Gender",
      xLabel: "Gender",
      yLabel: "Users"
    },
    disease: {
      endpoint: "http://localhost:9000/report/api/reports/disease-distribution",
      title: "Vaccinated Users with Pre-existing Conditions",
      xLabel: "Condition",
      yLabel: "Users"
    }
  };

  const { endpoint, title, xLabel, yLabel } = reportsMap[report];

  return (
    <div className="h-auto w-full py-10 bg-neutral-100 flex justify-center items-center rounded-4xl">
        <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-md bg-white">
            <div className="bg-red-700 text-white text-center py-4">
                <h2 className="text-2xl font-semibold">Reports</h2>
            </div>

            <div className="my-6 flex justify-center gap-4">
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition"
                    onClick={() => setReport("age")}
                >
                    Age
                </button>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition"
                    onClick={() => setReport("gender")}
                >
                    Gender
                </button>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition"
                    onClick={() => setReport("disease")}
                >
                    Disease
                </button>
            </div>

            <div className="flex justify-center overflow-x-auto px-4">
                <BarChart
                    endpoint={endpoint}
                    title={title}
                    xLabel={xLabel}
                    yLabel={yLabel}
                    width={800}
                    height={450}
                    barColor="#b91c1c"
                />
            </div>
        </div>
    </div>

  );
};

export default ReportsPage;
