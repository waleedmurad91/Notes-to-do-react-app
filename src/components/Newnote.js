import { useState } from 'react';
import './newnote.css';
export default function Newnote({ visible, onClose }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [color, setColor] = useState('white');
    const [reminder, setReminder] = useState('');
    if (!visible) return null;

    const handleSave = () => {
        const id = Date.now();
        const newNote = { title, content, tags, color, reminder, id };
        const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
        existingNotes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(existingNotes));
        onClose();
        window.dispatchEvent(new Event("notesUpdated"));

    };

    return (
        <div className="new-note-overlay" id="new-note-overlay">
            <div className="overlay-container">
                <div className="overlay-header">
                    <div className="overlay-heading">
                        <h2>➕ New Note</h2>
                    </div>
                    <div className="close-btn">
                        <button id="overlay-close" onClick={onClose}>x</button>
                    </div>
                </div>
                <form  onSubmit={handleSave}>
                <div className="note-title-input">
                    
                    <input
                        type="text"
                        placeholder="Note Title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="input-note-content">
                    <textarea
                        placeholder="Your note content"
                        required
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className="tags">
                    <label htmlFor="tags">Tags🏷️:</label>
                    <input
                        type="text"
                        placeholder="work, personal, idea"
                        required
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>
                <div className="reminder">
                    <div className="color-picker">
                        <label htmlFor="color">Color:</label>
                        <select
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        >
                            <option value="white">⚪ White</option>
                            <option value="rgb(254, 243, 199)">🟡 Yellow</option>
                            <option value="rgb(209, 250, 229)">🟢 Green</option>
                            <option value="rgb(224, 242, 254)">🔵 Blue</option>
                            <option value="rgb(253, 230, 138)">🟠 Orange</option>
                            <option value="rgb(252, 165, 165)">🔴 Red</option>
                        </select>
                    </div>
                    <div className="date-picker">
                        <label htmlFor="date">Reminder:</label>
                        <input
                            type="datetime-local"
                            required
                            onChange={(e) => setReminder(e.target.value)}
                        />
                    </div>
                </div>
                <div className="note-overlay-btns">
                    <button type='submit' id="savenote-btn">Save Note</button>
                    <button id="cancel-btn" onClick={onClose}>Cancel</button>
                </div>
                </form>
            </div>
        </div>
    );
}
