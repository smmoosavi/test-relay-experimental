import { Wire } from '@forminator/react-wire';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { FilmItem_film$key } from './__generated__/FilmItem_film.graphql';

const fragment = graphql`
  fragment FilmItem_film on Film {
    id
    title
  }
`;

interface Props {
  film: FilmItem_film$key;
  id$: Wire<string | null>;
}

export function FilmItem(props: Props) {
  const data = useFragment<FilmItem_film$key>(fragment, props.film);
  return (
    <button
      onClick={() => {
        props.id$.setValue(data.id);
      }}
    >
      {data.title}
    </button>
  );
}
