import React, { useState, useEffect, useCallback } from 'react';

function LeadNotes({ leadId, onClose }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const fetchNotes = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/leads/${leadId}/notes`);
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Error reading system notes ledger:", err);
    }
  }, [leadId]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      await fetch(`http://localhost:5000/api/leads/${leadId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note_text: newNote })
      });
      setNewNote('');
      fetchNotes();
    } catch (err) {
      console.error("Failed appending note record:", err);
    }
  };

  return (
    <div className="notes-box">
      <div className="notes-header">
        <h4>Follow-up Interaction Records</h4>
        <button className="btn-close" onClick={onClose}>×</button>
      </div>
      <form onSubmit={handleAddNote} className="note-input-row">
        <input type="text" placeholder="Type new interactions/updates note..." value={newNote} onChange={e => setNewNote(e.target.value)} />
        <button type="submit">Log Note</button>
      </form>
      <div className="notes-history-list">
        {notes.length === 0 ? <p className="empty-text">No notes documented yet.</p> : 
          notes.map(n => (
            <div key={n.id} className="note-item">
              <p>{n.note_text}</p>
              <small>{new Date(n.created_at).toLocaleString()}</small>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default LeadNotes;