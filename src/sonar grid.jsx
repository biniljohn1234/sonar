import React, { useRef, useEffect, useState } from 'react';

const RadarChart = () => {
  const canvasRef = useRef(null);
  const [lineDrawn, setLineDrawn] = useState(false);
  const [lineCoordinates, setLineCoordinates] = useState(null); // Store coordinates of the drawn line
  const [showAdditional, setShowAdditional] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const X = 220;
    const Y = 230; // Center adjusted to match canvas size

    const maxRadius = 465; // Maximum radius adjusted to fit within the canvas
    const numArcs = 5; // Number of arcs
    const totalAngle = 130 * (Math.PI / 180); // Total angle for the radar sectors (130 degrees)
    const numRadialLines = 5; // Number of radial lines
  

    // Function to draw the radar chart
    const drawRadarChart = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Save the current state of the canvas before transformation
      ctx.save();

      // Rotate around the canvas center for vertical orientation
      ctx.translate(X, Y);
      ctx.rotate(-Math.PI / 2); // Rotate -90 degrees (anticlockwise) for vertical orientation

      // Draw arcs
      for (let i = 1; i <= numArcs; i++) {
        const radius = (i * maxRadius) / numArcs;
        const startAngle = (Math.PI - totalAngle / 2);
        const endAngle = (Math.PI + totalAngle / 2);

        // Draw only the 5th arc and the outermost lines initially
        if (i === 5 || showAdditional) {
          ctx.beginPath();
          ctx.arc(X, Y, radius, startAngle, endAngle);
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        const angleStep = totalAngle / (numRadialLines - 1);
        const angle = startAngle + 0 * angleStep;
        const x = radius * Math.cos(angle);
        const y= radius * Math.sin(angle);
        drawRadialLine(X, Y, x, y);
       // drawPoint(X + x, Y + y);
       const angle4 = startAngle + 4 * angleStep;
        const x4= radius * Math.cos(angle4);
        const y4= radius * Math.sin(angle4);
        drawRadialLine(X, Y, x4, y4);
      
        // Draw radial lines and points at the intersections if line is drawn
        if (lineDrawn && (i === 5 || showAdditional)) {
          const angleStep = totalAngle / (numRadialLines - 1);
            const angle1 = startAngle + 1 * angleStep;
            const angle2 = startAngle + 2 * angleStep;
            const angle3 = startAngle + 3 * angleStep;
            const x1 = radius * Math.cos(angle1);
            const y1= radius * Math.sin(angle1);
            const x2 = radius * Math.cos(angle2);
            const y2 = radius * Math.sin(angle2);
            const x3 = radius * Math.cos(angle3);
            const y3 = radius * Math.sin(angle3);
            drawRadialLine(X, Y, x1, y1);
            drawPoint(X + x1, Y + y1);
            drawRadialLine(X, Y, x2, y2);
            drawPoint(X + x2, Y + y2);
            drawRadialLine(X, Y, x3, y3);
            drawPoint(X + x3, Y + y3);
          
        }
      }

      // Restore the canvas to its original state
      ctx.restore();

     };

    // Function to draw a radial line
    const drawRadialLine = (cx, cy, x, y) => {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + x, cy + y);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    // Function to draw a point
    const drawPoint = (x, y) => {
    };

    // Draw initial radar chart on component mount
    drawRadarChart();

  }, [lineDrawn, lineCoordinates, showAdditional]); // Include lineDrawn, lineCoordinates, and showAdditional in the dependencies array

  // Function to handle drawing or hiding the line and showing additional arcs and lines
  const toggleLineAndAdditional = () => {
    if (lineDrawn) {
      setLineDrawn(false);
      setLineCoordinates(null);
    } else {
      setLineDrawn(true);
      setLineCoordinates({ startX: 100, startY: 100, endX: 300, endY: 300 }); // Example coordinates
    }

    setShowAdditional(!showAdditional);
  };

  return (
    <div>
      <canvas
        id="imageCanvas"
        ref={canvasRef}
        width="900"
        height="500"
        style={{ border: '1px solid black' }}
        onClick={toggleLineAndAdditional}
      ></canvas>
      <button onClick={toggleLineAndAdditional}>
        {lineDrawn ? 'Hide grid' : 'show grid'} 
      </button>
    </div>
  );
};

export default RadarChart;
