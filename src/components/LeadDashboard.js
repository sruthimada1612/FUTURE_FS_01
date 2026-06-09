import React, { useState, useEffect } from 'react';
import LeadForm from './LeadForm';
import LeadList from './LeadList';

function LeadDashboard() {
  const [leads, setLeads] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLeads = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/leads');
      const data = await res.json();
      setLeads(data);
    } catch (err) {
      console.error("Error pulling database records:", err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const metrics = {
    total: leads.length,
    new: leads.filter(l => l.status === 'New').length,
    contacted: leads.filter(l => l.status === 'Contacted').length,
    converted: leads.filter(l => l.status === 'Converted').length,
  };

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = filterStatus === 'All' || lead.status === filterStatus;
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="crm-container">
      <h2>Client Lead Management Workspace</h2>
      
      <div className="metrics-grid">
        <div className="metric-card blue"><h3>Total Leads</h3><p>{metrics.total}</p></div>
        <div className="metric-card yellow"><h3>New</h3><p>{metrics.new}</p></div>
        <div className="metric-card purple"><h3>Contacted</h3><p>{metrics.contacted}</p></div>
        <div className="metric-card green"><h3>Converted</h3><p>{metrics.converted}</p></div>
      </div>

      <div className="crm-layout">
        <div className="crm-main">
          <div className="controls-bar">
            <input 
              type="text" 
              placeholder="Search leads by name/email..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Converted">Converted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <LeadList leads={filteredLeads} onUpdate={fetchLeads} />
        </div>
        
        <div className="crm-sidebar">
          <LeadForm onLeadAdded={fetchLeads} />
        </div>
      </div>
    </div>
  );
}

export default LeadDashboard;