import React, { useState } from 'react';

function LeadForm({ onLeadAdded }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', source: 'Website Form' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert("Name and Email are mandatory fields.");
      return;
    }

    try {
      await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setForm({ name: '', email: '', phone: '', source: 'Website Form' });
      onLeadAdded();
    } catch (err) {
      console.error("Error creating record entry:", err);
    }
  };

  return (
    <div className="crm-card">
      <h3>Add New Business Lead</h3>
      <form onSubmit={handleSubmit} className="vertical-form">
        <input type="text" placeholder="Lead Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input type="text" placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
        <select value={form.source} onChange={e => setForm({...form, source: e.target.value})}>
          <option value="Website Form">Website Form</option>
          <option value="LinkedIn">LinkedIn Campaign</option>
          <option value="Referral">Client Referral</option>
          <option value="Other">Other Channel</option>
        </select>
        <button type="submit" className="btn-accent">Ingest Lead Record</button>
      </form>
    </div>
  );
}

export default LeadForm;