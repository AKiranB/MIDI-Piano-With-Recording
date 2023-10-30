"use client";
import { useRef, useState } from "react";
import Key from "../components/key";
import { LinkedList, NotesList } from "../utils";

export default function Main() {
  const octave = [
    { note: "C4", type: "white", sample: "/C.wav" },
    { note: "C#4", type: "black", sample: "/Cs.wav" },
    { note: "D4", type: "white", sample: "/D.wav" },
    { note: "D#4", type: "black", sample: "/Ds.wav" },
    { note: "E4", type: "white", sample: "/E.wav" },
    { note: "F4", type: "white", sample: "/F.wav" },
    { note: "F#4", type: "black", sample: "/Fs.wav" },
    { note: "G4", type: "white", sample: "/G.wav" },
    { note: "G#4", type: "black", sample: "/Gs.wav" },
    { note: "A4", type: "white", sample: "/A.wav" },
    { note: "A#4", type: "black", sample: "/As.wav" },
    { note: "B4", type: "white", sample: "/B.wav" },
  ];

  const [recording, setRecording] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [recordingLength, setRecordingLength] = useState(0);
  const notesListRef = useRef<LinkedList>(new NotesList());

  function startRecording() {
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
