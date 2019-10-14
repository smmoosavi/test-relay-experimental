import React, { ReactNode } from 'react';
import { ErrorContext } from './ErrorContext';

interface Props {
  errorChildren?: ReactNode;
  children?: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error !== null) {
      return (
        <ErrorContext.Provider
          value={{
            error: this.state.error,
            reset: this.reset,
          }}
        >
          {this.props.errorChildren}
        </ErrorContext.Provider>
      );
    }

    return this.props.children;
  }
}
