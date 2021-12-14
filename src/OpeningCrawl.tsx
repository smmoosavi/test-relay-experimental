import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { OpeningCrawl_film$key } from './__generated__/OpeningCrawl_film.graphql';

interface Props {
  film: OpeningCrawl_film$key;
}

const fragment = graphql`
  fragment OpeningCrawl_film on Film {
    openingCrawl
  }
`;

function OpeningCrawl(props: Props) {
  const film = useFragment<OpeningCrawl_film$key>(fragment, props.film);

  return <div>{film.openingCrawl}</div>;
}

export default OpeningCrawl;
