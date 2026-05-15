
interface showType {
    _id: string,
    plot: string,
    title: string,
    genres: string[],
    year: number,
    imdb: { rating: number },
    languages: string[],
    runtime: number,
    cast: string[],
    poster: string,
    countries: string[],
    type: string
    rated: string
}

export type { showType }