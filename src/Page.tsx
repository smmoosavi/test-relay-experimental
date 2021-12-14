import { useWire } from '@forminator/react-wire';
import React from 'react';
import { FilmDetailSection } from './FilmDetailSection';
import { Films } from './Films';

interface Props {}

export function Page(props: Props) {
  const id$ = useWire<string | null>(null, null);
  return (
    <div>
      <Films id$={id$} />
      <FilmDetailSection id$={id$} />
    </div>
  );
}
