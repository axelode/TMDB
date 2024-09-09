import { FC } from 'react';

const Backdrop: FC<{ path: string }> = ({ path }) => {
    return (
        <img
            src={`https://image.tmdb.org/t/p/w500${path}`}
            width={"100%"}
            className="w-full h-screen absolute top-0 left-0 backdrop-opacity-80 z-0"
        />
    );
};

export default Backdrop;