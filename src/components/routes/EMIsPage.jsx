import EMICard from "../EMICard.jsx";
import { CreditCard } from "lucide-react";

export default function EMIsPage({ emis, onEdit, onToggle, onDelete }) {
  if (emis.length === 0) {
    return (
      <div className="empty-state">
        <CreditCard size={40} className="empty-icon red" />
        <p>No EMIs added yet. Click "Add EMI" to get started.</p>
      </div>
    );
  }
  return (
    <div className="cards-grid">
      {emis.map((emi) => (
        <EMICard
          key={emi.id}
          emi={emi}
          onEdit={onEdit}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}