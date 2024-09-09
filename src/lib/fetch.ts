import Axios from "axios";
import { useState } from "react";

export const fetchMovies = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    const getMovies = async (page: string) => {
        try {
            const response = await Axios({
                method: "Get",
                url: `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&page=${page}`
            });

            setMovies(response.data.results);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsError(true);
            setIsLoading(false);
        }
    };

    return { getMovies, movies, isLoading, isError };
};


export const fetchGenres = () => {
    const [genres, setGenres] = useState<IGenre[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    const getGenres = async () => {
        try {
            const response = await Axios({
                method: "Get",
                url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`
            });

            setGenres(response.data.genres);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsError(true);
            setIsLoading(false);
        }
    };

    return { getGenres, genres, isLoading, isError }
};