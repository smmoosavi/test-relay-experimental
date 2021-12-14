import React, { Suspense } from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import './App.css';
import { Page } from './Page';
import { environment } from './relay';
import { ErrorBoundary } from './shared/error-boundary';
import { ErrorView } from './shared/error-view';

const App: React.FC = () => {
  return (
    <div className="App">
      <RelayEnvironmentProvider environment={environment}>
        <ErrorBoundary fallback={<ErrorView retry />}>
          <Suspense fallback={'loading'}>
            <Page />
          </Suspense>
        </ErrorBoundary>
      </RelayEnvironmentProvider>
    </div>
  );
};

export default App;
