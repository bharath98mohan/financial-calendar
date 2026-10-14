import SIPCard from "../SIPCard.jsx";
import { TrendingUp } from "lucide-react";

export default function SIPsPage({ sips, onEdit, onToggle, onDelete }) {
  if (sips.length === 0) {
    return (
      <div className="empty-state">
        <TrendingUp size={40} className="empty-icon blue" />
        <p>No SIPs added yet. Click "Add SIP" to get started.</p>
      </div>
    );
  }
  return (
    <div className="cards-grid">
      {sips.map((sip) => (
        <SIPCard
          key={sip.id}
          sip={sip}
          onEdit={onEdit}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}