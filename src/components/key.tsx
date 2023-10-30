import { useEffect, useState } from "react";

interface KeyProps {
  note: string;
  type: string;
  onPress: (note: string) => void;
  sample: string;
}

export default function Key({ note, type, onPress, sample }: KeyProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    const audio = new Audio(sample);
    audio.play();
    setIsPressed(true);
    onPress(note);
  };

  useEffect(() => {
    const timeOutID = setTimeout(() => setIsPressed(false), 300);
    return () => clearTimeout(timeOutID);
  }, [isPressed]);

  return (
    <div
      data-note={note}
      className={`${
        type === "white"
          ? "bg-white h-48 w-12 border border-gray-300 onClick:shadow-md"
          : "bg-black h-32 w-8"
      } cursor-pointer ${isPressed && "shadow-md"}`}
      onClick={handlePress}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handlePress()}
    >
      {note}
    </div>
  );
}
