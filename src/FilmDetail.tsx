import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { FilmDetailQuery } from './__generated__/FilmDetailQuery.graphql';
import OpeningCrawl from './OpeningCrawl';
import { useRetryKey } from './shared/retry';

const query = graphql`
  query FilmDetailQuery($id: ID!) {
    film(id: $id) {
      id
      title
      ...OpeningCrawl_film
    }
  }
`;

interface Props {
  id: string;
}

export function FilmDetail(props: Props) {
  const fetchKey = useRetryKey();
  const data = useLazyLoadQuery<FilmDetailQuery>(
    query,
    { id: props.id },
    { fetchKey, fetchPolicy: 'network-only' },
  );
  if (data.film === null) {
    return <div>Not found</div>;
  }
  return (
    <div>
      <h2>{data.film && data.film.title}</h2>
      <OpeningCrawl film={data.film} />
    </div>
  );
}
