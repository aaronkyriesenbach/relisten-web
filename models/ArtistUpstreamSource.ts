import { UpstreamSource } from "./UpstreamSource";

export type ArtistUpstreamSource = {
    artist_id: number,
    upstream_source: UpstreamSource,
    upstream_source_id: number,
    upstream_identifier?: string;
};