import React from "react";
import Image from "next/image";

interface InvestSimplementProps {
  image?: string;
}

const InvestSimplement: React.FC<InvestSimplementProps> = ({ image }) => (
  <section>
    {image && <Image src={image} alt="InvestSimplement" width={200} height={200} />}
    <div>InvestSimplement content</div>
  </section>
);

export default InvestSimplement;
