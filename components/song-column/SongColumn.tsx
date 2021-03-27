import React from 'react';
import { connect } from 'react-redux';
import { copyToClipboard, createShowDate, durationToHHMMSS, removeLeadingZero, splitShowDate } from '../../lib/utils';
import Column from '../column/Column';
import Row from '../row/Row';
import RowHeader from '../RowHeader';

const SongColumn = (props: Props) => {
  const { source, loading, artistSlug, songSlug, activePlaybackSourceId, gaplessTracksMetadata } = props;
  const { year, month, day } = source && splitShowDate(source.display_date) || {};
  const isActiveSource = source ? source.id === activePlaybackSourceId : false;

  return (
    <Column heading={source ? `${removeLeadingZero(month)}/${removeLeadingZero(day)}/${year.slice(2)} (${source.sets[0].tracks.length})` : 'Songs'} loading={loading} loadingAmount={12}>
      <style jsx>{`
        .column {
          display: flex;
          flex: 1;
        }
      `}</style>
      {source && source.sets.map((set: any, setIdx: number) =>
        set.tracks.map((track: any, trackIdx: number) => {
          const trackIsActive = track.slug === songSlug && isActiveSource;
          const trackMetadata = isActiveSource
            ? gaplessTracksMetadata.find((gaplessTrack: any) =>
              gaplessTrack.trackMetadata && gaplessTrack.trackMetadata.trackId === track.id
            )
            : null;

          return (
            <div key={track.id}>
              {trackIdx === 0 && source.sets.length > 1 && <RowHeader>{set.name || `Set ${setIdx + 1}`}</RowHeader>}
              <Row key={track.id} active={trackIsActive} href={`/${artistSlug}/${year}/${month}/${day}/${track.slug}?source=${source.id}`}>
                <div>
                  <div>{track.title}</div>
                  {track.duration && <div className="subtext">{durationToHHMMSS(track.duration)}</div>}
                </div>
                <div>
                  <div>{trackMetadata && trackMetadata.webAudioLoadingState !== 'NONE' ? trackMetadata.webAudioLoadingState : ''}</div>
                </div>
              </Row>
            </div>
          );
        }
        )
      )}
      {source && <RowHeader>FIN</RowHeader>}
      {source && source.links &&
        source.links.map((link: any) =>
          <div className='relisten-row row' key={link.id} style={{ cursor: 'pointer' }}>
            <div>
              <a href={link.url} target='_blank' rel='noopener noreferrer'>{link.label}</a>
              {' '}
              <i className='fas fa-clone' onClick={() => copyToClipboard(link.url)} />
            </div>
          </div>
        )
      }
    </Column>
  );
};

type Props = {
  source?: any,
  loading?: boolean,
  artistSlug?: string,
  songSlug?: string,
  activePlaybackSourceId?: number,
  gaplessTracksMetadata?: any;
};

const mapStateToProps = (state: any) => {
  const { tapes, app, playback } = state;
  const activeSourceId = parseInt(app.source, 10);
  const activePlaybackSourceId = parseInt(playback.source, 10);
  const showDate = createShowDate(app.year, app.month, app.day);
  const showTapes = tapes[app.artistSlug] && tapes[app.artistSlug][showDate] ? tapes[app.artistSlug][showDate] : null;
  let source;

  if (!showTapes) return {};

  if (showTapes.data && showTapes.data.sources && showTapes.data.sources.length) {
    const { sources } = showTapes.data;

    source = sources.find((source: any) => source.id === activeSourceId) || sources[0];
  }

  return {
    source,
    loading: showTapes.meta.loading,
    artistSlug: app.artistSlug,
    songSlug: playback.songSlug,
    gaplessTracksMetadata: playback.gaplessTracksMetadata,
    activePlaybackSourceId,
  };
};

export default connect(mapStateToProps)(SongColumn);
