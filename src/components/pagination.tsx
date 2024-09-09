import { FC } from 'react';

const Pagination: FC<{ page: number, prev: () => void, next: () => void; }> = ({ page, prev, next }) => {
    return (
        <div className="join hover:shadow-[0_0_36px_5px_rgba(65,35,138,0.5)] transition-shadow duration-500 ease-in-out">
            <button className="join-item btn btn-outline text-white font-bold" onClick={prev}>«</button>
            <button className="join-item btn btn-outline text-white">Page {page}</button>
            <button className="join-item btn btn-outline text-white font-bold" onClick={next}>»</button>
        </div>
    );
};

export default Pagination;