import graphql from 'babel-plugin-relay/macro';
import React, { useTransition } from 'react';
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
  setId: (id: string) => void;
}

export function FilmItem(props: Props) {
  const [isPending, startTransition] = useTransition();
  const data = useFragment<FilmItem_film$key>(fragment, props.film);
  return (
    <button
      onClick={() => {
        startTransition(() => {
          props.setId(data.id);
        });
      }}
    >
      {data.title} {isPending && '...'}
    </button>
  );
}
