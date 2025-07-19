import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const PieChart = ({ endpoint, title, width = 400, height = 400, colors }) => {
  const svgRef = useRef();
  const [data, setData] = useState([]);
  const filteredData = data.filter(d => d.count > 0);

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Error fetching pie data:", err));
  }, [endpoint]);

  useEffect(() => {
    if (!filteredData || filteredData.length === 0) return;

    const radius = Math.min(width, height) / 2;
    const svg = d3.select(svgRef.current)
        .attr("width", width + 200)
        .attr("height", height + 40);
    svg.selectAll("*").remove(); // clear old chart

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${(height / 2) + 40})`);

    const color = colors
      ? d3.scaleOrdinal().range(colors)
      : d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value(d => d.count);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const arcs = g.selectAll("arc").data(pie(filteredData)).enter().append("g");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.label));

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text(title);

    const sortedLegendData = [...data].sort((a, b) => b.count - a.count);

    const legend = svg
      .append("g")
      .attr("transform", `translate(${width}, 40)`); // position legend right side
    
    const legendItem = legend.selectAll(".legend-item")
      .data(sortedLegendData)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 25})`);
    
    legendItem.append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", d => color(d.label));
    
    legendItem.append("text")
      .attr("x", 24)
      .attr("y", 14)
      .text(d => d.label)
      .style("font-size", "14px");
    

  }, [filteredData, width, height, colors, title]);

  return (
      <svg ref={svgRef} width={width} height={height}></svg>
  );
};

export default PieChart;
