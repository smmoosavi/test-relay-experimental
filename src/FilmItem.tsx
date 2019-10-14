import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'relay-experimental';
import {
  FilmItem_film,
  FilmItem_film$ref,
} from './__generated__/FilmItem_film.graphql';

const fragment = graphql`
  fragment FilmItem_film on Film {
    id
    title
  }
`;

interface Props {
  film: FilmItem_film$ref;
  setId: (id: string) => void;
}

export function FilmItem(props: Props) {
  const data = useFragment<FilmItem_film>(fragment, props.film);
  return (
    <button
      onClick={() => {
        props.setId(data.id);
      }}
    >
      {data.title}
    </button>
  );
}
