import { useWireValue, Wire } from '@forminator/react-wire';
import React, { Suspense } from 'react';
import { FilmDetail } from './FilmDetail';
import { ErrorBoundary } from './shared/error-boundary';
import { ErrorView } from './shared/error-view';

interface Props {
  id$: Wire<string | null>;
}

export function FilmDetailSection(props: Props) {
  const id = useWireValue(props.id$);
  if (id === null) {
    return <span>no film selected</span>;
  }
  return (
    <ErrorBoundary fallback={<ErrorView retry />}>
      <Suspense fallback={<span>loading...</span>}>
        <FilmDetail id={id} />
      </Suspense>
    </ErrorBoundary>
  );
}
