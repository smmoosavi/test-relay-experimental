import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { FragmentRef } from 'relay-runtime';
import { OpeningCrawl_film } from './__generated__/OpeningCrawl_film.graphql';

interface Props {
  film: FragmentRef<OpeningCrawl_film>;
}

const fragment = graphql`
  fragment OpeningCrawl_film on Film {
    openingCrawl
  }
`;

function OpeningCrawl(props: Props) {
  const film = useFragment<OpeningCrawl_film>(fragment, props.film);

  return <div>{film.openingCrawl}</div>;
}

export default OpeningCrawl;
