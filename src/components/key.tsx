interface KeyProps {
  note: string;
  type: string;
  onPress: (note: string) => void;
  sample: string;
}

export default function Key({ note, type, onPress, sample }: KeyProps) {
  const handlePress = () => {
    console.log(sample);

    const audio = new Audio(sample);
    audio.play();
    onPress(note);
  };

  return (
    <div
      className={`${
        type === "white"
          ? "bg-white h-48 w-12 border border-gray-300"
          : "bg-black h-32 w-8"
      } cursor-pointer`}
      onClick={handlePress}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handlePress()}
    >
      {note}
    </div>
  );
}
