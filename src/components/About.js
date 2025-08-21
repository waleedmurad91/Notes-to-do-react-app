import './about.css';
export default function About({ aboutVisible, onAboutclose }) {
  if ( !aboutVisible ) return null;
  return (
    <>
      <div className="about-overlay">
        <div className="about-header">
          <div className="about-heading">
            <h2>⚙️ About</h2>
          </div>
          <div className="about-close">
            <button onClick={onAboutclose}>X</button>
          </div>
        </div>
        <div className="about-content-container">
          <div className="content">
            <p> <span> Notes App Pro</span>
              is a feature-rich, browser-based note-taking application designed to boost your productivity and streamline information management.</p>
          </div>
          <hr />
          <div className="key-features">
            <h3>Key Features:</h3>
            <ul>

              <li><strong>Rich Note Creation:</strong> Add titles, content, tags, colors, and reminders.</li>
              <li><strong> Smart Organization:</strong> Pin, archive, and color-code notes.</li>
              <li><strong>Advanced Reminders:</strong> Set time-based alerts with desktop notifications and sounds.</li>
              <li><strong>Instant Search:</strong> Quickly find notes by title, content, or tags.</li>
              <li><strong>Data Security: </strong>Works offline using local storage—no cloud needed.</li>
              <li><strong>Customizable Interface:</strong> Responsive design, smooth animations, and hover effects.</li>
              <li><strong>Productivity Tools: </strong>Character counter, edit history, bulk actions.</li>
            </ul>
          </div>
          <div className="key-features">
            <h3>Technical Highlights:</h3>
            <ul>

              <li>HTML5, CSS3, and Vanilla JavaScript</li>
              <li>Local Storage Persistence</li>
              <li>Notification API Integration</li>
              <li>Cross-Device Compatibility</li>
              <li>Robust Error Handling & Validation</li>
            </ul>
          </div>
          <div className="key-features">
            <h3>Use Cases:</h3>
            <ul>
              <li>✔ Personal task management</li>
              <li>✔ Meeting & lecture notes</li>
              <li>✔ Project planning & idea brainstorming</li>
              <li>✔ Shopping lists & checklists</li>
            </ul>
          </div>
          <div className="key-features">
            <h3>Special Features:</h3>
            <ul>
              <li>🔔 Customizable reminders with alert types</li>
              <li>🏷️ Tag system for better organization</li>
              <li>📌 Priority pinning for critical notes</li>
              <li>📦 Archive system for completed tasks</li>
              <li>🎨 Color coding for categories</li>
            </ul>
          </div>
          <div className="key-features">
            <h3>Requirements:</h3>
            <ul>
              <li>🌐 Modern browser (Chrome, Firefox, Edge)</li>
              <li>🔒 HTTPS or localhost for notifications</li>
            </ul>
          </div>

        </div>
      </div>
    </>
  )
}
