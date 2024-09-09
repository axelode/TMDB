import { FC } from 'react';

const Poster: FC<{ path: string; }> = ({ path }) => {
    return (
        <img
            src={`https://image.tmdb.org/t/p/w500${path}`}
            width={"100%"}
            className='w-96 rounded-lg border border-white hover:shadow-[0_0_36px_15px_rgba(65,35,138,0.5)] transition-shadow duration-500 ease-out'
        />

    );
};

export default Poster;