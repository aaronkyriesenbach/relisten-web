import { ArtistUpstreamSource } from "./ArtistUpstreamSource";
import { Features } from "./Features";

export type Artist = {
    upstream_sources?: ArtistUpstreamSource[],
    features: Features,
    musicbrainz_id?: string,
    name?: string,
    featured: boolean,
    slug?: string,
    sort_name?: string,
    uuid: string,
    id: number,
    created_at: Date,
    updated_at: Date;
};