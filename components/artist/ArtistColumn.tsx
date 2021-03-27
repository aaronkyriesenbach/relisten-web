import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ArtistWithCounts } from '../../models/ArtistWithCounts';
import { ReceivedData } from '../../models/ReceivedData';
import Column from '../column/Column';
import RowHeader from '../RowHeader';
import ArtistRow from './ArtistRow';

function ArtistColumn(props: Props) {
  const { artists, artistSlug } = props || {};

  const featuredArtists = artists && Object.values(artists).filter(a => a.featured);
  const nonFeaturedArtists = artists && Object.values(artists).filter(a => !a.featured);

  return (
    <Column heading='Bands'>
      {[featuredArtists, nonFeaturedArtists].map((group?: ArtistWithCounts[], index?: number) => (
        group && group.length > 0 &&
        <Fragment key={index}>
          <RowHeader>{group[0].featured ? 'Featured' : 'Bands'}</RowHeader>
          {group.map((artist: ArtistWithCounts) => <ArtistRow key={artist.id} artist={artist} active={artist.slug === artistSlug} />)}
        </Fragment>
      ))}
    </Column>
  );
};

type Props = {
  artists?: ArtistWithCounts[],
  artistSlug: string;
};

const mapStateToProps = (state: { artists?: ReceivedData<ArtistWithCounts>, app: any; }) => {
  const { artists, app } = state;

  return {
    artists: artists?.data,
    artistSlug: app.artistSlug
  };
};

export default connect(mapStateToProps)(ArtistColumn);
