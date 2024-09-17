import React, { useState } from "react";

interface MotionControlsProps {
  onMove: (steps: number) => void;
  onTurn: (degrees: number) => void;
  onGoTo: (x: number, y: number) => void;
}

const MotionControls: React.FC<MotionControlsProps> = ({
  onMove,
  onTurn,
  onGoTo,
}) => {
  const [steps, setSteps] = useState(10);
  const [degrees, setDegrees] = useState(90);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  return (
    <div className="p-4 bg-gray-100 shadow rounded">
      <div className="mb-2">
        <button
          onClick={() => onMove(steps)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Move {steps} steps
        </button>
      </div>
      <div className="mb-2">
        <button
          onClick={() => onTurn(degrees)}
          className="bg-green-500 text-white p-2 rounded"
        >
          Turn {degrees} degrees
        </button>
      </div>
      <div className="mb-2">
        <button
          onClick={() => onGoTo(x, y)}
          className="bg-purple-500 text-white p-2 rounded"
        >
          Go to X: {x}, Y: {y}
        </button>
      </div>
    </div>
  );
};

export default MotionControls;
