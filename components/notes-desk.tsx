'use client';
import { useEffect, useState } from 'react';

const papers = [
  { id: 'build-journal', name: 'Build Journal', icon: '✎', paper: 'blank', starter: 'TODAY’S BUILD\nWhat did I make progress on?\nWhat decision took the most thought?\nWhat would I do differently next time?\n\nSMALL WIN\nWrite down one thing that works better now.' },
  { id: 'side-quests', name: 'Side Quests', icon: '✦', paper: 'lines', starter: 'IDEA PARKING LOT\n□ Make a tiny interactive CS concept demo\n□ Add a visual architecture sketch to a project README\n□ Record a short walkthrough of a tricky feature\n\nNEXT SMALL STEP\nChoose one idea that can be finished in an afternoon.' },
  { id: 'debug-log', name: 'Debug Log', icon: '⌘', paper: 'grid', starter: 'BUG REPORT\nWhat did I expect to happen?\nWhat happened instead?\nSmallest steps to reproduce:\n\nTHE FIX\nRoot cause:\nHow I checked the fix:\nWhat I learned:' },
  { id: 'interview-prep', name: 'Interview Prep', icon: '☷', paper: 'dots', starter: 'PROJECT STORY\nThe problem I wanted to solve:\nThe part I owned:\nA trade-off I had to make:\nWhat I learned from the result:\n\nPractice explaining this in under two minutes.' },
];
const storageKey = (id: string) => `parul-portfolio-note-v2-${id}`;

export default function NotesDesk() {
  const [openPaper, setOpenPaper] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  const paper = papers.find((item) => item.id === openPaper);

  useEffect(() => {
    if (!openPaper) return;
    try {
      const savedNote = localStorage.getItem(storageKey(openPaper));
      setText(savedNote ?? paper?.starter ?? '');
    } catch { setText(paper?.starter ?? ''); }
    setSaved(false);
  }, [openPaper]);

  function saveNote() {
    if (!openPaper) return;
    try { localStorage.setItem(storageKey(openPaper), text); setSaved(true); } catch { setSaved(false); }
  }

  return <section className="notes-desk" aria-labelledby="notes-heading">
    <div className="notes-topbar"><span className="notes-search" aria-hidden="true">⌕</span><span>BUILD JOURNAL</span><span>SIDE QUESTS</span><span>DEBUG LOG</span><span>INTERVIEW PREP</span><b id="notes-heading">NOTES</b></div>
    <div className="notes-desktop">
      <div className="notes-window">
        <div className="notes-titlebar"><span>{paper ? paper.name : 'Dev Notes'}</span><span className="notes-window-controls" aria-hidden="true">□　—　×</span></div>
        {paper ? <div className="note-editor-wrap">
          <div className="note-editor-toolbar"><button type="button" className="notes-back" onClick={() => setOpenPaper(null)}>← All notes</button><span>Saved on this device</span></div>
          <textarea aria-label={`${paper.name} note`} className={`note-paper paper-${paper.paper}`} value={text} onChange={(event) => { setText(event.target.value); setSaved(false); }} placeholder="Add an idea or a useful reminder…" />
          <div className="note-actions"><span role="status">{saved ? 'Saved ✓' : 'Private to this browser'}</span><button type="button" className="notes-save" onClick={saveNote}>SAVE NOTE</button></div>
        </div> : <div className="notes-folders">
          {papers.map((item) => <button className="note-folder-button" type="button" key={item.id} onClick={() => setOpenPaper(item.id)} aria-label={`Open ${item.name}`}>
            <span className={`note-folder-art folder-${item.paper}`} aria-hidden="true"><i>{item.icon}</i></span><span>{item.name}</span>
          </button>)}
        </div>}
      </div>
      <aside className="notes-side-window"><div className="notes-titlebar"><span>Sticky memo</span><span className="notes-window-controls" aria-hidden="true">_　×</span></div><div className="notes-side-content"><span className="notes-star" aria-hidden="true">✦</span><p>Catch a thought<br/>before it escapes.</p><small>Plan · reflect · repeat</small></div></aside>
      <span className="notes-spark notes-spark-one" aria-hidden="true">✦</span><span className="notes-spark notes-spark-two" aria-hidden="true">✦</span>
    </div>
  </section>;
}
