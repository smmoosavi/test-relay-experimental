import React, { PropsWithChildren, useCallback } from 'react';
import { useErrorContext } from 'src/shared/error';
import { useRetryContext } from 'src/shared/retry';

const defaultGetErrorText = () => `Something went wrong. Please try again.`;

interface OwnProps {
  getErrorText?: (error: Error) => string;
  retry?: boolean | ((reset: () => void) => void);
}

export type Props = PropsWithChildren<OwnProps>;

export function ErrorView(props: Props) {
  const error = useErrorContext();
  const retry$ = useRetryContext();
  const reset = useCallback(() => {
    retry$.fns.retry();
  }, [retry$]);
  const { retry, getErrorText = defaultGetErrorText } = props;

  const onRetry = useCallback(() => {
    if (retry === true) {
      reset();
    } else {
      retry && retry(reset);
    }
  }, [retry, reset]);

  const errorText = getErrorText(error);

  return (
    <div>
      {errorText}
      <br />
      {!!retry && <button onClick={onRetry}>Try again</button>}
    </div>
  );
}
