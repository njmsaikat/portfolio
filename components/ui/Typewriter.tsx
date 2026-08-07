"use client";

import { useEffect, useState } from "react";

export function Typewriter({ words, className = "" }: { words: string[]; className?: string }) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const typingSpeed = deleting ? 40 : 90;
    const atFullWord = !deleting && text === current;
    const atEmpty = deleting && text === "";

    const timeout = setTimeout(() => {
      if (atFullWord) {
        setTimeout(() => setDeleting(true), 1400);
        return;
      }
      if (atEmpty) {
        setDeleting(false);
        setWordIndex((i) => i + 1);
        return;
      }
      setText(current.slice(0, text.length + (deleting ? -1 : 1)));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words]);

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-current align-middle" style={{ height: "1em" }} />
    </span>
  );
}
