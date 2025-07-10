import React from "react";

function CtaCard({ className='justify-start md:flex-row', image, title, description }) {
  return (
    <div
      className={`mt-10 p-4 border rounded-md shadow-sm flex flex-col ${className} gap-8`}
    >
      <div className="max-w-[540px]">
        <img className="w-full object-cover" src={image} alt="" />
      </div>
      <div>
        <h3>{title}</h3>
        <p className="max-w-2xl mt-4">{description}</p>
      </div>
    </div>
  );
}

export default CtaCard;
