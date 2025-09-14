import React from "react";
import PressCard, { PressCardProps } from "./PressCard";

export interface PressListProps {
  items: PressCardProps["press"][];
  pagination: {
    page: number;
    hasNext: boolean;
  };
  onPageChange: (page: number) => void;
}

const PressList: React.FC<PressListProps> = ({ items, pagination, onPageChange }) => (
  <div>
    {items.map((press) => (
      <PressCard key={press.uid} press={press} />
    ))}
    {/* Pagination controls */}
    <div className="flex justify-center mt-6">
      <button disabled={pagination.page === 1} onClick={() => onPageChange(pagination.page - 1)}>
        Précédent
      </button>
      <span className="mx-4">Page {pagination.page}</span>
      <button disabled={!pagination.hasNext} onClick={() => onPageChange(pagination.page + 1)}>
        Suivant
      </button>
    </div>
  </div>
);

export default PressList;
