import { useState, useEffect } from "react";
export default function CopyToClipboard({ text }) {
  const [copyText, setCopyText] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopyText(true);
    } catch (error) {
      console.error("failed to copy: ", error);
    }
  }
  useEffect(() => {
    if (!copyText) return;
    const timer = setTimeout(() => {
      setCopyText(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [copyText]);

  return (
    <button
      type="button"
      className="delete-button"
      id="hex-color"
      onClick={handleCopy}
    >
     {copyText ? "Copied!" : "Copy"}
    </button>
  );
}
