'use client';

interface NoteErrorProps {
  error: Error;
}

function NoteErrorMessage({ error }: NoteErrorProps) {
  return <p>Could not fetch note details. {error.message}</p>;
}

export default NoteErrorMessage;
