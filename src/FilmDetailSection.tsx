import { useWireValue, Wire } from '@forminator/react-wire';
import React, { Suspense } from 'react';
import { FilmDetail } from './FilmDetail';

interface Props {
  id$: Wire<string | null>;
}

export function FilmDetailSection(props: Props) {
  const id = useWireValue(props.id$);
  if (id === null) {
    return <span>no film selected</span>;
  }
  return (
    <Suspense fallback="loading">
      <FilmDetail id={id} />
    </Suspense>
  );
}
