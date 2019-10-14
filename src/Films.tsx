import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'relay-experimental';
import { FilmsQuery } from './__generated__/FilmsQuery.graphql';
import { FilmItem } from './FilmItem';

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
  setId: (id: string) => void;
}

export function Films(props: Props) {
  const data = useLazyLoadQuery<FilmsQuery>(query, {});
  return (
    <div>
      {data.allFilms.edges.map(edge => {
        return (
          <div key={edge.node.id}>
            <FilmItem film={edge.node} setId={props.setId} />
          </div>
        );
      })}
    </div>
  );
}
