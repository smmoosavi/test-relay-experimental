import { Wire } from '@forminator/react-wire';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { FilmsQuery } from './__generated__/FilmsQuery.graphql';
import { FilmItem } from './FilmItem';
import { useRetryKey } from './shared/retry';

const query = graphql`
  query FilmsQuery {
    allFilms {
      edges {
        node {
          id
          ...FilmItem_film
        }
      }
    }
  }
`;

interface Props {
  id$: Wire<string | null>;
}

export function Films(props: Props) {
  const fetchKey = useRetryKey();
  const data = useLazyLoadQuery<FilmsQuery>(
    query,
    {},
    { fetchKey, fetchPolicy: 'network-only' },
  );
  return (
    <div>
      {data.allFilms.edges.map((edge) => {
        return (
          <div key={edge.node.id}>
            <FilmItem film={edge.node} id$={props.id$} />
          </div>
        );
      })}
      <button onClick={() => props.id$.setValue('ZmlsbXM6NDQ0')}>bad id</button>
    </div>
  );
}
