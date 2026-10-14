import BankInterestCard from "../BankInterestCard.jsx";
import { Landmark } from "lucide-react";

export default function BankPage({ bankFDs, onEdit, onDelete }) {
  if (bankFDs.length === 0) {
    return (
      <div className="empty-state">
        <Landmark size={40} className="empty-icon amber" />
        <p>
          No FD / Savings added yet. Click "Add FD / Savings" to
          start.
        </p>
      </div>
    );
  }
  return (
    <div className="cards-grid">
      {bankFDs.map((fd) => (
        <BankInterestCard
          key={fd.id}
          bankFD={fd}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}