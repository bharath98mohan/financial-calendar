import BondCard from "../BondCard.jsx";
import { BarChart3 } from "lucide-react";

export default function BondsPage({ bonds, onEdit, onDelete }) {
  if (bonds.length === 0) {
    return (
      <div className="empty-state">
        <BarChart3 size={40} className="empty-icon purple" />
        <p>No bonds added yet. Click "Add Bond" to get started.</p>
      </div>
    );
  }
  return (
    <div className="cards-grid">
      {bonds.map((bond) => (
        <BondCard
          key={bond.id}
          bond={bond}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}