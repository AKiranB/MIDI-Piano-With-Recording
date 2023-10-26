"use client";
import Key from "../components/key";

export default function Main() {
  const octave = [
    { note: "C4", type: "white", sample: "/C.wav" },
    { note: "C#4", type: "black", sample: "/C#.wav" },
    { note: "D4", type: "white", sample: "/D.wav" },
    { note: "D#4", type: "black", sample: "/D#.wav" },
    { note: "E4", type: "white", sample: "/E.wav" },
    { note: "F4", type: "white", sample: "/F.wav" },
    { note: "F#4", type: "black", sample: "/F#.wav" },
    { note: "G4", type: "white", sample: "/G.wav" },
    { note: "G#4", type: "black", sample: "/G#.wav" },
    { note: "A4", type: "white", sample: "/A.wav" },
    { note: "A#4", type: "black", sample: "/A#.wav" },
    { note: "B4", type: "white", sample: "/B.wav" },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex">
        {octave.map((key, i) => {
          return (
            <Key
              note={key.note}
              type={key.type}
              onPress={(note) => null}
              sample={key.sample}
              key={i}
            />
          );
        })}
        <Key
          type="white"
          note={"C"}
          sample="someSample"
          onPress={(note) => console.log(note)}
        />
      </div>
    </main>
  );
}
