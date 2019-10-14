import React, { useContext, useEffect, useRef } from 'react';
import { ErrorContext } from './ErrorContext';

interface Props {
  nonce?: unknown;
}

export function ErrorViewer(props: Props) {
  const { reset } = useContext(ErrorContext);
  const onClick = () => {
    reset();
  };

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    reset();
  }, [props.nonce, reset]);
  return (
    <div>
      Error
      <br />
      <button onClick={onClick}>retry</button>
    </div>
  );
}
