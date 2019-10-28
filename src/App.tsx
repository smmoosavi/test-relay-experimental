import React, { Suspense, useState } from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import './App.css';
import { ErrorBoundary } from './ErrorBoundary';
import { ErrorViewer } from './ErrorViewer';
import { FilmDetail } from './FilmDetail';
import { Films } from './Films';
import { environment } from './relay';

const App: React.FC = () => {
  const [id, setId] = useState<string | null>(null);
  return (
    <div className="App">
      <RelayEnvironmentProvider environment={environment}>
        <ErrorBoundary errorChildren={<ErrorViewer />}>
          <Suspense fallback="loading">
            <Films setId={setId} />
          </Suspense>
          <Suspense fallback="loading">
            <ErrorBoundary errorChildren={<ErrorViewer nonce={id} />}>
              {id !== null && <FilmDetail id={id} />}
            </ErrorBoundary>
          </Suspense>
        </ErrorBoundary>
      </RelayEnvironmentProvider>
    </div>
  );
};

export default App;
