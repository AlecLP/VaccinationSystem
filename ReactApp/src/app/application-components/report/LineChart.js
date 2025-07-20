import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

const LineChart = ({
  endpoint,
  title,
  width = 800,
  height = 400,
  lineColor = "#1d4ed8",
  xLabel = "Date",
  yLabel = "Doses",
}) => {
  const svgRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!endpoint) return;
    axios.get(endpoint).then((res) => {
      setData(res.data);
    });
  }, [endpoint]);

  useEffect(() => {
    if (!data.length) return;

    const margin = { top: 50, right: 30, bottom: 50, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const parseDate = d3.timeParse("%Y-%m-%d");

    const formattedData = data.map(d => ({
      ...d,
      date: parseDate(d.label),
    }));

    const allDates = d3.timeDay.range(
      d3.min(formattedData, d => d.date),
      d3.max(formattedData, d => d.date),
      1
    );
    
    const dataWithZeros = allDates.map(date => {
      const found = formattedData.find(d => +d.date === +date);
      return found ? found : { date, count: 0 };
    });    

    const x = d3
      .scaleTime()
      .domain(d3.extent(dataWithZeros, (d) => d.date))
      .range([0, innerWidth]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(dataWithZeros, (d) => d.count)])
      .nice()
      .range([innerHeight, 0]);

    // Line generator
    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.count))
      .curve(d3.curveMonotoneX);

    // X Axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(
        d3.axisBottom(x)
          .ticks(d3.timeDay.every(1))
          .tickFormat(d3.timeFormat("%b %d"))
      )
      .selectAll("text")
      .style("text-anchor", "middle");

    // Y Axis
    const yMax = d3.max(dataWithZeros, d => d.count);
    g.append("g").call(d3.axisLeft(y).ticks(yMax).tickFormat(d3.format("d")));


    // Labels
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text(title);

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text(xLabel);

    svg
      .append("text")
      .attr("x", -(height / 2))
      .attr("y", 15)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text(yLabel);

    // Draw line
    g.append("path")
      .datum(dataWithZeros)
      .attr("fill", "none")
      .attr("stroke", lineColor)
      .attr("stroke-width", 2.5)
      .attr("d", line);

    // Draw dots
    const tooltip = d3.select("#tooltip");
    const container = svgRef.current.parentElement.getBoundingClientRect();
    g.selectAll("circle")
      .data(dataWithZeros)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.date))
      .attr("cy", d => y(d.count))
      .attr("r", 4)
      .attr("fill", "#2563eb")
      .on("mouseover", (event, d) => {
        tooltip
          .style("left", `${event.pageX - container.left + 10}px`)
          .style("top", `${event.pageY - container.top - 28}px`)
          .style("opacity", 1)
          .style("display", "block")
          .html(`<strong>Date:</strong> ${d3.timeFormat("%b %d")(d.date)}<br/><strong>Doses:</strong> ${d.count}`);
      })
      .on("mouseout", () => {
        tooltip
          .style("opacity", 0)
          .style("display", "none");
      });


  }, [data, endpoint, width, height]);

  return (
    <div className="p-2 relative">
      <div id="tooltip" className="absolute bg-white p-2 rounded shadow text-sm hidden pointer-events-none z-50 whitespace-nowrap"></div>
      <svg ref={svgRef}></svg>
    </div>
  );   
};

export default LineChart;
