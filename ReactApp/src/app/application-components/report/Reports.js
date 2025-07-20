import React, { useState } from "react";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import LineChart from "./LineChartDate";

const ReportsPage = () => {
  const [report, setReport] = useState("age");

  const reportsMap = {
    age: {
      endpoint: "http://localhost:9000/report/api/reports/age-distribution",
      title: "Vaccinated Patients by Age Group",
      xLabel: "Age Group",
      yLabel: "Patients"
    },
    gender: {
      endpoint: "http://localhost:9000/report/api/reports/gender-distribution",
      title: "Vaccinated Patients by Gender",
      xLabel: "Gender",
      yLabel: "Patients"
    },
    disease: {
      endpoint: "http://localhost:9000/report/api/reports/disease-distribution",
      title: "Vaccinated Patients by Pre-existing Conditions",
      xLabel: "Condition",
      yLabel: "Patients"
    },
    practicioner: {
      endpoint: "http://localhost:9000/report/api/reports/practicioner-distribution",
      title: "Vaccinated Patients by Practicioner",
      xLabel: "Practicioner",
      yLabel: "Patients"
    },
    doses: {
      endpoint: "http://localhost:9000/report/api/reports/doses-per-day",
      title: "# of Doses Per Day",
      xLabel: "Date",
      yLabel: "Doses"
    }
  };

  const { endpoint, title, xLabel, yLabel } = reportsMap[report];

  return (
    <div className="h-auto w-full py-10 bg-neutral-100 flex justify-center items-center rounded-4xl">
        <div className="w-full mx-7 rounded-3xl overflow-hidden shadow-md bg-white">
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
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition"
                    onClick={() => setReport("practicioner")}
                >
                    Practicioner
                </button>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition"
                    onClick={() => setReport("doses")}
                >
                    Doses Per Day
                </button>
            </div>

            <div className="flex items-center justify-center overflow-x-auto px-4 mb-4 gap-56">
                {report === "doses" ? 
                  <LineChart
                  endpoint={endpoint}
                  title={title}
                  xLabel={xLabel}
                  yLabel={yLabel}
                  width={1000}
                  height={450}
                  lineColor="#16a34a"
                />                
                :<>
                  <BarChart
                      endpoint={endpoint}
                      title={title}
                      xLabel={xLabel}
                      yLabel={yLabel}
                      width={800}
                      height={450}
                      barColor="#b91c1c"
                  />
                  <PieChart
                    endpoint={endpoint}
                    title={title}
                    width={400}
                    height={400}
                  />
                </>
                }
            </div>
        </div>
    </div>

  );
};

export default ReportsPage;
