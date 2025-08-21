import './App.css';
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Newnote from "./components/Newnote";
import About from "./components/About";
import Howto from "./components/Howto";
import NotesList from './components/NotesList';

export default function App() {
  const [showoverlay, setshowoverlay] = useState(false);
  const [aboutOverlay, setaboutOverlay] = useState(false);
  const [howtoOverlay, setHowtoOverlay] = useState(false);
  return (
    <>
    
      <div className={`container ${showoverlay || aboutOverlay || howtoOverlay ? 'dimmed' : ''}`}>
        <Navbar
          onNewNoteClick={() => setshowoverlay(true)}
          onaboutClick={() => setaboutOverlay(true)}
          onHowtoClick={() => setHowtoOverlay(true)}
        />
        <NotesList />
      </div>

      <Newnote
        visible={showoverlay}
        onClose={() => setshowoverlay(false)}
      />
      <About aboutVisible={aboutOverlay} onAboutclose={() => setaboutOverlay(false)} />
      <Howto howtovisible={howtoOverlay} onhowtoClose={() => setHowtoOverlay(false)} />
    </>
  );
}
