"use client";

import MusicNote from "../components/MusicNote";
import { useCallback, useState } from "react";

const Notes = ["e", "f", "g", "a", "h", "c", "d", "e", "f", "g", "a", "h", "c"];
const Cells = Array.from({ length: 3 }, (_, idx) => idx);
const EmptyAnswers = Cells.map(() => "");

const getRandomKeys = (length: number) =>
  Array.from({ length }, () => {
    const idx = Math.round(Math.random() * Notes.length);
    const note = Notes[idx];
    return `${note}-${idx}`;
  });

function getState(input: string, note: string) {
  if (input == "") return "init";
  if (input == note) return "right";
  return "wrong";
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
    <div className="h-screen w-full bg-zinc-50 dark:bg-black">
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
                      state={getState(answers[col], note)}
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
