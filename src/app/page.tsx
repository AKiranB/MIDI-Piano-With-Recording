"use client";
import { useEffect, useRef, useState } from "react";
import Key from "../components/key";
import { LinkedList, NotesList } from "../utils";

export default function Main() {
  const octave = [
    { note: "C", type: "white", sample: "/C.wav" },
    { note: "C#", type: "black", sample: "/Cs.wav" },
    { note: "D", type: "white", sample: "/D.wav" },
    { note: "D#", type: "black", sample: "/Ds.wav" },
    { note: "E", type: "white", sample: "/E.wav" },
    { note: "F", type: "white", sample: "/F.wav" },
    { note: "F#", type: "black", sample: "/Fs.wav" },
    { note: "G", type: "white", sample: "/G.wav" },
    { note: "G#", type: "black", sample: "/Gs.wav" },
    { note: "A", type: "white", sample: "/A.wav" },
    { note: "A#", type: "black", sample: "/As.wav" },
    { note: "B", type: "white", sample: "/B.wav" },
  ];

  const [recording, setRecording] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [recordingLength, setRecordingLength] = useState(0);
  const notesListRef = useRef(new NotesList());

  const polyphonicNotes = [
    { note: "C", time: 1000 },
    { note: "D", time: 1000 },
    { note: "E", time: 1000 },
  ];

  useEffect(() => {
    for (let i = 0; i < polyphonicNotes.length; i++) {
      notesListRef.current.append(polyphonicNotes[i]);
    }
    notesListRef.current.printList();
  }, []);

  const audioContext = useRef(new AudioContext());

  console.log(audioContext.current.baseLatency);

  function startRecording() {
    notesListRef.current.clear();
    const start = new Date().getTime();
    setStartTime(start);
    setRecording(true);
  }

  function handleStop() {
    const stop = new Date().getTime();
    const length = stop - startTime;
    setRecordingLength(length);
    notesListRef.current.printList();
    setRecording(false);
  }

  function handleKeyPress(note: string) {
    if (recording) {
      notesListRef.current.append({
        note,
        time: new Date().getTime() - startTime,
      });
    }
  }

  function playNote(note: string) {
    // Find the corresponding sample for the note
    const noteSample = octave.find((n) => n.note === note);

    fetch(noteSample?.sample as string)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => audioContext.current.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        const noteSource = audioContext.current.createBufferSource();
        noteSource.buffer = audioBuffer;
        noteSource.connect(audioContext.current.destination);
        noteSource.start();
      })
      .catch((error) =>
        console.error("Error with fetching the audio file:", error)
      );
  }
  function handlePlayback() {
    if (notesListRef.current.isEmpty()) return;

    const startTime = Date.now();
    let noteNode = notesListRef.current.head;

    while (noteNode !== null) {
      const playTime = noteNode.noteData.time;
      const delay = playTime - (Date.now() - startTime);
      const note = noteNode.noteData.note;
      setTimeout(() => {
        playNote(note);
      }, delay);
      noteNode = noteNode.next;
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {recording && <div className="bg-red-200">Recording</div>}
      <button
        onClick={() => {
          if (recording) {
            handleStop();
          } else {
            startRecording();
          }
        }}
        className="px-24 m-24"
      >
        Record
      </button>
      <button
        className="bg-green-300"
        onClick={() => {
          handlePlayback();
        }}
      >
        Play
      </button>
      <div className="flex">
        {octave.map((key, i) => {
          return (
            <Key
              note={key.note}
              type={key.type}
              onPress={(note) => handleKeyPress(note)}
              sample={key.sample}
              key={i}
            />
          );
        })}
      </div>
    </main>
  );
}
