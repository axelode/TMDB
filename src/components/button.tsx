import { FC } from 'react';

const Button: FC<{ prev: () => void, next: () => void }> = ({ prev, next }) => {
    return (
        <div className="join grid grid-cols-2 hover:shadow-[0_0_36px_5px_rgba(65,35,138,0.5)] transition-shadow duration-500 ease-in-out">
            <button className="join-item btn btn-outline text-white" onClick={prev}>Prev</button>
            <button className="join-item btn btn-outline text-white" onClick={next}>Next</button>
        </div>
    );
};

export default Button;