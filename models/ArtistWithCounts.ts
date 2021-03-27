import { Artist } from "./Artist";

export type ArtistWithCounts = Artist & {
    show_count: number,
    source_count: number;
};