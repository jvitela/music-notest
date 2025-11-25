"use client";

import { useState } from "react";
import Modal from "./Modal";

export default function ModalDemo() {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={() => setOpen(true)}
        className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
      >
        Open modal
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Modal Demo">
        <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Demo modal
          </div>
          <div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="rounded-full p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              ✕
            </button>
          </div>
        </header>
        <main className="px-6 py-6 text-sm text-zinc-700 dark:text-zinc-300">
          <p className="mb-4">
            This is a centered modal window. It closes on Escape or outside
            click.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm bg-sky-600 text-white hover:bg-sky-700"
            >
              Got it
            </button>
          </div>
        </main>
        <footer className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-100 dark:border-zinc-800">
          <button
            onClick={onClose}
            className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200"
          >
            Close
          </button>
        </footer>
      </Modal>
    </div>
  );
}
