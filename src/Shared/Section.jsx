import React from "react";

function Section({ children, className='' }) {
  return (
    <section className={`my-8 md:my-12 lg:my-16 py-8 md:py-12 lg:py-16 gap-8 ${className}`}>
      {children}
    </section>
  );
}

export default Section;
