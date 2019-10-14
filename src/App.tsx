import React, { Suspense, useState } from 'react';
import { RelayEnvironmentProvider } from 'relay-experimental';
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
          <ErrorBoundary errorChildren={<ErrorViewer nonce={id} />}>
            <Suspense fallback="loading">
              {id !== null && <FilmDetail id={id} />}
            </Suspense>
          </ErrorBoundary>
        </ErrorBoundary>
      </RelayEnvironmentProvider>
    </div>
  );
};

export default App;
