export interface MoviesByGenre {
    page:          number;
    results:       movie[];
    total_pages:   number;
    total_results: number;
}

export interface movie {
    adult:             boolean;
    backdrop_path:     string;
    genre_ids:         number[];
    id:                number;
    title:             string;
    original_language: string;
    original_title:    string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    release_date:      Date;
    softcore:          boolean;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}