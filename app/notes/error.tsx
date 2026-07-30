'use client';

interface NoteErrorProps {
  error: Error;
}

function Error({ error }: NoteErrorProps) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}

export default Error;
