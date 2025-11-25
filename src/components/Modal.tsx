"use client";

import React, { useEffect, useRef } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg";
};

export default function Modal({
  open,
  onClose,
  children,
  title = "",
  size = "md",
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // close on escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // trap focus to dialog when open (simple)
  useEffect(() => {
    if (!open || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    first?.focus();

    function handleFocus(e: FocusEvent) {
      if (!dialog.contains(e.target as Node)) {
        e.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("focus", handleFocus, true);
    return () => document.removeEventListener("focus", handleFocus, true);
  }, [open]);

  if (!open) return null;

  const sizeClass =
    size === "sm" ? "max-w-xl" : size === "lg" ? "max-w-4xl" : "max-w-2xl";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
      onMouseDown={(e) => {
        // click on overlay to close
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`w-full ${sizeClass} rounded-2xl bg-white dark:bg-zinc-900 shadow-xl ring-1 ring-black/5`}
      >
        {children}
      </div>
    </div>
  );
}
