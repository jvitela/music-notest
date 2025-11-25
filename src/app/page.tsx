"use client";

import MusicNote from "../components/MusicNote";
import { useCallback, useState } from "react";

const Notes = ["c", "h", "a", "g", "f", "e", "d", "c", "h", "a", "g", "f", "e"];
const Cells = Array.from({ length: 4 }, (_, idx) => idx);
const EmptyAnswers = Cells.map(() => "");

function getRandomKeys(n: number): string[] {
  if (n > Notes.length) {
    throw new Error("Requested more elements than available in Notes");
  }

  // Generate key values
  const shuffled = Notes.map((note, idx) => `${note}-${idx}`);

  // Fisher–Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Take the first n elements
  return shuffled.slice(0, n);
}

export default function Home() {
  const rows = Notes;
  const [colValues, setColValues] = useState<string[]>([]);
  const [answers, setAnswers] = useState(EmptyAnswers);
  const isFinished = answers.every((value) => value != "");
  const isInProgress = !isFinished && colValues.length > 0;

  const saveAnswer = useCallback(
    (col: number, answer: string) => {
      const result = answers.slice();
      result[col] = answer;
      setAnswers(result);
    },
    [answers, setAnswers]
  );

  const restart = () => {
    setColValues(getRandomKeys(Cells.length));
    setAnswers(EmptyAnswers);
  };

  return (
    <div className="h-screen w-full bg-zinc-50 dark:bg-black svg-background">
      <main className="h-full w-full grid grid-rows-16">
        {rows.map((note, row) => (
          <section
            key={`${note}-${row}`}
            className="flex items-center justify-center bg-horiz-line"
          >
            {Cells.map((col) => (
              <div
                className="w-full max-w-5xl px-6 text-center"
                key={`col-${col}`}
              >
                {colValues.length == Cells.length &&
                  colValues[col] == `${note}-${row}` && (
                    <MusicNote
                      value={note}
                      answer={answers[col]}
                      hasBorders={row == 0 || row == rows.length - 1}
                      onSelected={(answer) => saveAnswer(col, answer)}
                    />
                  )}
              </div>
            ))}
            <div
              className={`p-1 text-xl w-15 ${isFinished ? "" : "opacity-0"}`}
            >
              {note}
            </div>
          </section>
        ))}
        <section className="flex items-center justify-center row-span-3">
          <div className="flex-row items-center px-8 py-1">
            <p className="pb-3 pt-1">
              Drück den Startknopf und wähl die richtigen Noten anhand des
              Bassschlüssels aus.
            </p>
            <button
              disabled={isInProgress}
              onClick={restart}
              className="w-full rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-25"
            >
              Start
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
