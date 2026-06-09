import React, { useState } from 'react';
import LeadNotes from './LeadNotes';

function LeadList({ leads, onUpdate }) {
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/leads/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      onUpdate();
    } catch (err) {
      console.error("Failed status transaction update:", err);
    }
  };

  return (
    <div className="crm-card table-responsive">
      <table className="crm-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Details</th>
            <th>Channel Source</th>
            <th>Pipeline Status</th>
            <th>Follow Ups</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(lead => (
            <tr key={lead.id}>
              <td><strong>{lead.name}</strong></td>
              <td>
                <div>{lead.email}</div>
                <small style={{ color: '#94a3b8' }}>{lead.phone || 'N/A'}</small>
              </td>
              <td><span className="source-tag">{lead.source}</span></td>
              <td>
                <select 
                  value={lead.status} 
                  className={`status-select ${lead.status.toLowerCase()}`}
                  onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Converted">Converted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
              <td>
                <button className="btn-small" onClick={() => setSelectedLeadId(selectedLeadId === lead.id ? null : lead.id)}>
                  {selectedLeadId === lead.id ? 'Close Logs' : 'View Notes'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedLeadId && (
        <div className="modal-overlay-inline">
          <LeadNotes leadId={selectedLeadId} onClose={() => setSelectedLeadId(null)} />
        </div>
      )}
    </div>
  );
}

export default LeadList;