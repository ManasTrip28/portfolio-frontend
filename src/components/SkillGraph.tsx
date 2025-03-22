import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Skill {
  id: string;
  group: number;
  value: number; // Size of the node
}

interface Link {
  source: string;
  target: string;
  value: number;
}

interface SkillsGraphProps {
  className?: string;
}

const SkillsGraph: React.FC<SkillsGraphProps> = ({ className }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const skills: Skill[] = [
      { id: "Machine Learning", group: 1, value: 1.75 * 30 + 20 },
      { id: "Deep Learning", group: 1, value: 1.75 * 30 + 20 },
      { id: "GenAi Tools", group: 1, value: 1.75 * 30 + 20 },
      { id: "Web Scrapping", group: 2, value: 1.25 * 30 + 20 },
      { id: "Python", group: 2, value: 1.5 * 30 + 20 },
      { id: "C++", group: 2, value: 1.5 * 30 + 20 },
      { id: "HTML", group: 3, value: 1.25 * 30 + 20 },
      { id: "CSS", group: 3, value: 1 * 30 + 20 },
      { id: "DBMS", group: 3, value: 1 * 30 + 20 },
      { id: "PowerBI", group: 4, value: 1 * 30 + 20 },
      { id: "Linux", group: 4, value: 1 * 30 + 20 },
      { id: "n8n", group: 5, value: 1.5 * 30 + 20 },
      { id: "AWS", group: 5, value: 1 * 30 + 20 },
      { id: "RAG-powered applications", group: 1, value: 2 * 30 + 20 },
    ];

    // Create links only from center to all skills
    const links: Link[] = [];
    
    // Add a central node
    skills.unshift({ id: "Center", group: 0, value: 10 });
    
    // Link all skills to the center ONLY (removed the code that linked skills to each other)
    skills.forEach((skill) => {
      if (skill.id !== "Center") {
        links.push({
          source: "Center",
          target: skill.id,
          value: 1
        });
      }
    });

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Get dimensions from the container
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = 590; // Fixed height

    // Create the SVG container
    const svg = d3.select(svgRef.current)
      .attr("width", containerWidth)
      .attr("height", containerHeight)
      .attr("viewBox", [0, 0, containerWidth, containerHeight]);

    // Create a force simulation
    const simulation = d3.forceSimulation(skills as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(containerWidth / 2, containerHeight / 2))
      .force("collide", d3.forceCollide().radius((d: any) => d.value + 10).iterations(2));

    // Create gradient definitions for nodes
    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
      .attr("id", "skillGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%");
      
    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#4F46E5");
      
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#9333EA");

    // Add links
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "rgba(148, 163, 184, 0.2)")
      .attr("stroke-width", (d) => Math.sqrt(d.value) * 1.5);

    // Create node groups
    const node = svg.append("g")
      .selectAll("g")
      .data(skills)
      .join("g")
      .attr("class", "node")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);

    // Add circles to nodes
    node.append("circle")
      .attr("r", (d) => d.id === "Center" ? 0 : d.value) // Hidden center node
      .attr("fill", (d) => {
        if (d.id === "Center") return "none";
        return "url(#skillGradient)";
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5);

    // Add text labels
    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("fill", "#fff")
      .style("font-size", (d) => (d.id === "Center" ? 0 : `${Math.min(d.value / 4 + 10, 16)}px`))
      .style("pointer-events", "none")
      .style("font-weight", "600")
      .text((d) => d.id === "Center" ? "" : d.id);

    // Update positions on each tick of the simulation
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Drag functions for interactivity
    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      
      // Update SVG dimensions
      svg.attr("width", newWidth)
         .attr("viewBox", [0, 0, newWidth, containerHeight]);
      
      // Update center force
      simulation.force("center", d3.forceCenter(newWidth / 2, containerHeight / 2));
      simulation.alpha(0.3).restart();
    };

    window.addEventListener("resize", handleResize);
    
    // Floating animation using a subtle force change
    const floatAnimation = () => {
      simulation.force("center", 
        d3.forceCenter(
          containerWidth / 2 + Math.sin(Date.now() / 3000) * 10, 
          containerHeight / 2 + Math.cos(Date.now() / 4000) * 10
        )
      );
      simulation.alpha(0.1).restart();
      requestAnimationFrame(floatAnimation);
    };
    
    floatAnimation();

    return () => {
      window.removeEventListener("resize", handleResize);
      simulation.stop();
    };
  }, []);

  return (
    <div ref={containerRef} className={`w-full overflow-hidden ${className || ''}`}>
      <svg ref={svgRef} className="w-full"></svg>
    </div>
  );
};

export default SkillsGraph;