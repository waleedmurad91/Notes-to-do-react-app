import './howto.css';
export default function Howto({howtovisible,onhowtoClose}) {
    if(!howtovisible) return null;
  return (
    <>
      <div className="how-to-overlay">
        <div className="how-to-header">
          <div className="how-to-heading">
            <h2>❓ How to Use</h2>
          </div>
          <div className="how-to-close">
            <button onClick={onhowtoClose}>X</button>
          </div>
        </div>
        <div className="how-to-instructions">
            <ul>
                <li><strong>📝 Add Note:</strong> Click “Add Note” to create a new note with title, content, tags, color, and reminder.</li>
                <li><strong>🔍 Search:</strong> Instantly find notes using the search bar by typing titles, content, or tags.</li>
                <li><strong>📌 Pin Notes:</strong> Use the pin icon to mark critical notes and keep them at the top.</li>
                <li><strong>📦 Archive:</strong> Move less-used notes to the archive for a clean workspace.</li>
                <li><strong>🎨 Color Coding:</strong> Pick a color to group and distinguish your notes visually.</li>
                <li><strong>🔔 Reminders:</strong> Add a time-based reminder and get notified via sound and desktop alerts.</li>
                <li><strong>🧹 Bulk Actions:</strong> Select and manage multiple notes at once (archive, delete, or restore).</li>
                <li><strong>📜 Version History:</strong> Review and revert to earlier edits of your notes (if enabled).</li>
                <li><strong>💡 Tip:</strong>Your notes are saved locally — no internet required after loading the app once.</li>
            </ul>
        </div>
      </div>
    </>
  )
}
