import graphql from 'babel-plugin-relay/macro';
import React, { useTransition } from 'react';
import { useFragment } from 'react-relay/hooks';
import { FragmentRef } from 'relay-runtime';
import { FilmItem_film } from './__generated__/FilmItem_film.graphql';

const fragment = graphql`
  fragment FilmItem_film on Film {
    id
    title
  }
`;

interface Props {
  film: FragmentRef<FilmItem_film>;
  setId: (id: string) => void;
}

export function FilmItem(props: Props) {
  const [startTransition, isPending] = useTransition({ timeoutMs: 1000 });
  const data = useFragment<FilmItem_film>(fragment, props.film);
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
