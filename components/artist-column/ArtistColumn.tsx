import React from 'react';
import { connect } from 'react-redux';
import { groupBy, simplePluralize } from '../../lib/utils';
import Column from '../column/Column';
import Row from '../row/Row';
import RowHeader from '../RowHeader';

const byObject = {
  wsp: 'PanicStream',
  phish: 'Phish.in',
};

function ArtistColumn(props: Props) {
  const { artists = {}, artistSlug } = props;

  return (
    <Column heading="Bands">
      {artists
        && artists.data
        && Object.entries(groupBy(Object.values(artists.data), 'featured'))
          // Sort by the type of each group of artists - featured group first, then non-featured bands
          .sort(([type1], [type2]) => Number.parseInt(type2) - Number.parseInt(type1))
          .map(([type, artists]) =>
            [
              <RowHeader key={`header-${type}`}>{type === '1' ? 'Featured' : 'Bands'}</RowHeader>,
              ...(artists as any).map((artist: { id: string, name: string, slug: 'wsp' | 'phish', show_count: number, source_count: number; }, idx: number) =>
                <Row key={[idx, artist.id].join(':')} href={`/${artist.slug}`} active={artist.slug === artistSlug}>
                  <div>
                    {artist.name}
                    {byObject[artist.slug] && <span className="subtext">Powered by {byObject[artist.slug]}</span>}
                  </div>
                  <div>
                    <div>{simplePluralize('show', artist.show_count)}</div>
                    <div>{simplePluralize('tape', artist.source_count)}</div>
                  </div>
                </Row>
              ),
            ]
          )}
    </Column>
  );
};

type Props = {
  artists?: any,
  artistSlug: string;
};

const mapStateToProps = (state: any) => {
  const { artists, app } = state;

  return {
    artists,
    artistSlug: app.artistSlug
  };
};

export default connect(mapStateToProps)(ArtistColumn);
