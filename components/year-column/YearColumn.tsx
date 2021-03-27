import React from 'react';
import { connect } from 'react-redux';
import sortActiveBands from '../../lib/sortActiveBands';
import { simplePluralize } from '../../lib/utils';
import { ArtistWithCounts } from '../../models/ArtistWithCounts';
import { ReceivedData } from '../../models/ReceivedData';
import { Year } from '../../models/Year';
import Column from '../column/Column';
import Row from '../row/Row';

function YearColumn(props: Props) {
  const { artistYears, artistSlug, currentYear, artists } = props;

  return (
    <Column
      heading={artistYears && artists.find(a => a.slug === artistSlug)?.name || 'Years'}
      loading={artistYears && artistYears.meta && artistYears.meta.loading}
      loadingAmount={12}>
      {artistYears && artistYears.data && sortActiveBands(artistSlug, artistYears.data).map(year =>
        <Row key={year.id} href={`/${artistSlug}/${year.year}`} active={year.year === currentYear}>
          <div>
            <div>{year.year}</div>
          </div>
          <div className='desc'>
            <div>{simplePluralize('show', year.show_count)}</div>
            <div>{simplePluralize('tape', year.source_count)}</div>
          </div>
        </Row>
      )}
    </Column>
  );
};

type Props = {
  artistYears: ReceivedData<Year>,
  artistSlug: string,
  currentYear: string,
  artists: ArtistWithCounts[];
};

const mapStateToProps = (state: any) => {
  const { years, app, artists } = state;

  return {
    artistYears: years[app.artistSlug],
    artistSlug: app.artistSlug,
    currentYear: app.year,
    artists: Object.values(artists.data)
  };
};

export default connect(mapStateToProps)(YearColumn);
