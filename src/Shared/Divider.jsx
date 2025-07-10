import React from "react";

function Divider({ children }) {
  return (
    <div className="relative flex items-center py-5">
      <div className="flex-grow border-t border-gray-300"></div>
      {children && (
        <span className="flex-shrink mx-4 text-gray-500">{children}</span>
      )}
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
}

export default Divider;
