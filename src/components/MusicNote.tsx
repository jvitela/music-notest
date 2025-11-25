"use client";
import WhiteCircle from "../components/WhiteCircle";

type MusicNoteProps = {
  hasBorders?: boolean;
  state?: string;
  value?: string;
  onSelected: (value: string) => void;
};

export default function MusicNote({
  state = "init",
  value = "",
  hasBorders = false,
  onSelected,
}: MusicNoteProps) {
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
        state == "wrong" && <span className="grow text-red-700">{value}</span>
      )}

      <div
        className={
          hasBorders ? "bg-foreground relative w-4 h-1 top-7 left-4" : ""
        }
      ></div>
    </div>
  );
}
