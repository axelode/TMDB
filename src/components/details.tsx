import { FC, useEffect, useRef, useState } from 'react';
import { fetchGenres } from '../lib/fetch';
import Typed from 'typed.js';

const Details: FC<{ movie: IMovie; }> = ({ movie }) => {
    const { getGenres, genres, isLoading, isError } = fetchGenres();
    const releaseYear = new Date(movie.release_date).getFullYear();

    const findGenres = genres.filter((data) => {
        return movie.genre_ids.some((id) => data.id.toString() === id.toString());
    });

    const el = useRef(null);

    const [rate, setRate] = useState<number>(0);

    const countRate = () => {
        const targetRate = Math.round(movie.vote_average * 10);

        if (rate < targetRate) {
            const interval = setInterval(() => {
                setRate(prevRate => {
                    if (prevRate < targetRate) {
                        return prevRate + 1;
                    } else {
                        clearInterval(interval);
                        return prevRate;
                    }
                });
            }, 30);
        }
    };

    useEffect(() => {
        setRate(0);
    }, [movie]);

    useEffect(() => {
        if (rate === 0) {
            countRate();
        }
    }, [rate]);

    useEffect(() => {
        getGenres();

        const typed = new Typed(el.current, {
            strings: [movie.overview],
            typeSpeed: 5,
            showCursor: false
        });

        return () => {
            typed.destroy();
        };
    }, [movie]);

    return (
        <div className='flex flex-col justify-start items-start gap-4 text-white'>
            {/* title */}
            <div>
                <h1 className='text-4xl text-white font-bold'>{movie.title} <span className='font-thin'>({releaseYear})</span></h1>
                <p className='text-xl text-slate-400 font-bold'>Original title : {movie.original_title}</p>
            </div>

            {/* information */}
            <div className='text-white'>
                <p>
                    Genres : <> </>
                    {isLoading && (<span>Loading...</span>)}
                    {isError && (<span>Error...</span>)}

                    {genres && (
                        findGenres.map((data, index) => (
                            <span className='font-bold' key={data.id}>
                                {data.name}
                                {index < findGenres.length - 1 ? ', ' : ''}
                            </span>
                        ))
                    )}
                </p>

                <p>
                    Release date : <span className='font-bold'>{movie.release_date.split('-').reverse().join('/')}</span>
                </p>
            </div>

            {/* statistics */}
            <div className='flex gap-2 text-white rounded-lg hover:shadow-[0_0_36px_15px_rgba(65,35,138,0.6)] hover:bg-[rgba(65,35,138,0.5)] transition-shadow duration-500 ease-out'>
                <div className='flex gap-2'>
                    {/* age rating */}
                    <div className='flex justify-center items-center px-8 border border-white text-4xl font-bold rounded-lg hover:bg-amber-400 transition-colors duration-500 ease-out'>
                        <span>
                            {movie.adult ? "21+" : "17+"}
                        </span>
                    </div>

                    {/* language */}
                    <div className='flex justify-center items-center px-8 border border-white text-4xl font-bold rounded-lg hover:bg-amber-400 transition-colors duration-500 ease-out'>
                        <span>
                            {movie.original_language.toUpperCase()}
                        </span>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <div className='flex justify-center gap-2 py-4 border rounded-lg hover:bg-amber-400 transition-colors duration-500 ease-out'>
                        <div
                            className="radial-progress text-fuchsia-500 font-bold"
                            style={{ "--value": rate } as React.CSSProperties}
                            role="progressbar"
                        >
                            {rate}%
                        </div>

                        <div className='flex flex-col items-center gap-2'>
                            <h1 className='text-4xl text-white font-bold'>{movie.vote_average.toFixed(1)}/10</h1>
                            <h1 className='text-xl text-white'>Vote Average</h1>
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
                        {/* vote */}
                        <div className='p-2 border border-white text-lg font-bold rounded-lg hover:bg-amber-400 transition-colors duration-500 ease-out'>
                            <span>
                                {new Intl.NumberFormat('en-US').format(movie.vote_count)} <span className='font-thin'>Vote</span>
                            </span>
                        </div>

                        {/* popularity */}
                        <div className='p-2 border border-white text-lg font-bold rounded-lg hover:bg-amber-400 transition-colors duration-500 ease-out'>
                            <span>
                                {new Intl.NumberFormat('en-US').format(movie.popularity)} <span className='font-thin'>Popularity</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* overview */}
            <div>
                <h1 className='text-lg text-white font-bold'>Overview</h1>
                <p className='text-sm text-justify text-white' ref={el}></p>
            </div>
        </div>
    );
};

export default Details;