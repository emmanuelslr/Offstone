import React from "react";

interface InvestSimplementProps {
  image?: string;
}

const InvestSimplement: React.FC<InvestSimplementProps> = ({ image }) => (
  <section>
    {image && <img src={image} alt="InvestSimplement" />}
    <div>InvestSimplement content</div>
  </section>
);

export default InvestSimplement;
