import { simplePluralize } from '../../lib/utils';
import { ArtistWithCounts } from "../../models/ArtistWithCounts";
import Row from '../row/Row';

const poweredBy = {
    wsp: 'PanicStream',
    phish: 'Phish.in',
};

export default function ArtistRow(props: Props) {
    const { artist, active } = props;

    return (
        <Row key={artist.id} href={`/${artist.slug}`} active={active}>
            <div>
                {artist.name}
                {artist.slug && artist.slug in poweredBy && <span className="subtext">Powered by {poweredBy[(artist.slug as 'wsp' | 'phish')]}</span>}
            </div>
            <div>
                <div>{simplePluralize('show', artist.show_count)}</div>
                <div>{simplePluralize('tape', artist.source_count)}</div>
            </div>
        </Row>
    );
}

type Props = {
    artist: ArtistWithCounts,
    active: boolean;
};