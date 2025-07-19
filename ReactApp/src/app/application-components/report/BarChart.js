import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const BarChart = ({
  endpoint,
  title = "Bar Chart",
  xLabel = "Label",
  yLabel = "Count",
  width = 600,
  height = 400,
  barColor = "#b91c1c"
}) => {

    const [data, setData] = useState([]);
    const chartRef = useRef();

    useEffect(() => {
        if (!endpoint) return;
        fetch(endpoint)
        .then(res => res.json())
        .then(setData)
        .catch(err => console.error("Error fetching chart data:", err));
    }, [endpoint]);

    useEffect(() => {
        if (!data.length) return;

        const margin = { top: 40, right: 20, bottom: 60, left: 60 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Clear previous chart
        d3.select(chartRef.current).selectAll("*").remove();

        const svg = d3
        .select(chartRef.current)
        .attr("width", width)
        .attr("height", height);

        const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

        // X scale
        const x = d3
        .scaleBand()
        .domain(data.map(d => d.label))
        .range([0, innerWidth])
        .padding(0.1);

        // Y scale
        const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d.count)])
        .nice()
        .range([innerHeight, 0]);

        // X axis
        g.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "middle");

        // Y axis
        const yAxis = d3.axisLeft(y)
        .tickValues(d3.range(0, Math.ceil(d3.max(data, d => d.count)) + 1))
        .tickFormat(d3.format("d"));
        g.append("g").call(yAxis);

        // Bars
        g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(d.label))
        .attr("y", d => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", d => innerHeight - y(d.count))
        .attr("fill", barColor);

        // Chart title
        svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text(title);

        // X-axis label
        svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height - 10)
        .attr("text-anchor", "middle")
        .text(xLabel);

        // Y-axis label
        svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 15)
        .attr("x", -height / 2)
        .attr("text-anchor", "middle")
        .text(yLabel);
    }, [data, width, height, title, xLabel, yLabel, barColor]);

    return <svg ref={chartRef}></svg>;
};

export default BarChart;
