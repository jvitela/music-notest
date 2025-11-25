"use client";

import { useState } from "react";
import Modal from "./Modal";

type WhiteCircleProps = {
  className?: string;
  ariaLabel?: string;
  onSelected: (value: string) => void;
};

type OptionButtonProps = {
  value: string;
  onClick: () => void;
};

function OptionButton({ value, onClick }: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-md w-full px-2 py-2 bg-background text-foreground hover:bg-sky-700"
    >
      <span className="text-3xl">{value}</span>
    </button>
  );
}

const values = ["f", "a", "c", "e", "g", "h", "d"];

export default function WhiteCircle({
  className = "",
  ariaLabel = "White circle",
  onSelected,
}: WhiteCircleProps) {
  const [selection, select] = useState("");
  const isOpen = selection == "?";

  return (
    <>
      <button
        role="img"
        aria-label={ariaLabel}
        className={className}
        onClick={() => select("?")}
      />
      <Modal open={isOpen} onClose={() => select("")}>
        <div className="px-3 py-3 text-sm text-zinc-700 dark:text-zinc-300">
          <div className="flex flex-row">
            {values.map((value) => (
              <div className="basis-1/7" key={value}>
                <OptionButton value={value} onClick={() => onSelected(value)} />
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}
