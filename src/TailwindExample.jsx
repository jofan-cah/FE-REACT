import React, { useState } from 'react';

const TailwindExample = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          Tailwind CSS Counter
        </h1>
        <div className="flex items-center justify-center space-x-4 mb-4">
          <button
            onClick={() => setCount(count - 1)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Decrease
          </button>
          <span className="text-2xl font-semibold text-gray-800">
            {count}
          </span>
          <button
            onClick={() => setCount(count + 1)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Increase
          </button>
        </div>
        <p className={`
          text-sm 
          ${count > 0 ? 'text-green-600' : count < 0 ? 'text-red-600' : 'text-gray-500'}
        `}>
          {count > 0
            ? 'Positive count! Keep going!'
            : count < 0
              ? 'Negative count. Going down!'
              : 'Neutral count'}
        </p>
      </div>
    </div>
  );
};

export default TailwindExample;