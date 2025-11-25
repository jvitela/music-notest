"use client";
import WhiteCircle from "../components/WhiteCircle";

type MusicNoteProps = {
  hasBorders?: boolean;
  value?: string;
  answer?: string;
  onSelected: (value: string) => void;
};

function getState(input: string, note: string) {
  if (input == "") return "init";
  if (input == note) return "right";
  return "wrong";
}

export default function MusicNote({
  value = "",
  answer = "",
  hasBorders = false,
  onSelected,
}: MusicNoteProps) {
  const state = getState(answer, value);
  return (
    <div className="flex text-5xl font-bold w-16 h-16 mx-auto rounded-full bg-zinc-300 dark:bg-zinc-600 border-foreground border-2 shadow-md">
      <div
        className={
          hasBorders ? "bg-foreground relative w-4 h-1 top-7 right-4" : ""
        }
      ></div>

      {state == "init" ? (
        <WhiteCircle
          className="grow"
          ariaLabel="Demo white circle"
          onSelected={onSelected}
        />
      ) : state == "right" ? (
        <span className="grow text-green-700">{value}</span>
      ) : (
        state == "wrong" && <span className="grow text-red-700">{answer}</span>
      )}

      <div
        className={
          hasBorders ? "bg-foreground relative w-4 h-1 top-7 left-4" : ""
        }
      ></div>
    </div>
  );
}
