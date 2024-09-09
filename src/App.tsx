import { useEffect, useState } from "react";
import Button from "./components/button";
import Poster from "./components/poster";
import Backdrop from "./components/backdrop";
import Details from "./components/details";
import Pagination from "./components/pagination";
import { fetchMovies } from "./lib/fetch";
import { Transition } from 'react-transition-group';

const App = () => {
  const { getMovies, movies, isLoading, isError } = fetchMovies();
  const [page, setPage] = useState<number>(1);
  const [index, setIndex] = useState<number>(0);
  const [show, setShow] = useState<boolean>(true);

  const duration = 500;

  const posterStyle = {
    transition: `transform ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
    transform: 'translateX(100%)',
    opacity: 0,
  };

  const posterTransitionStyles: { [key: string]: React.CSSProperties; } = {
    entering: { transform: 'translateX(0%)', opacity: 1 },
    entered: { transform: 'translateX(0%)', opacity: 1 },
    exiting: { transform: 'translateX(-100%)', opacity: 0 },
    exited: { transform: 'translateX(-100%)', opacity: 0 },
  };

  const detailStyle = {
    transition: `transform ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
    transform: 'translateY(-100%)',
    opacity: 0,
  };

  const detailTransitionStyles: { [key: string]: React.CSSProperties; } = {
    entering: { transform: 'translateY(0%)', opacity: 1 },
    entered: { transform: 'translateY(0%)', opacity: 1 },
    exiting: { transform: 'translateY(-100%)', opacity: 0 },
    exited: { transform: 'translateY(-100%)', opacity: 0 },
  };

  useEffect(() => {
    getMovies(page.toString());
  }, [page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="w-full h-screen relative flex justify-center items-center bg-[#0D0D0D]">
      {isLoading && (
        <span className="loading loading-spinner loading-lg"></span>
      )}

      {isError && (
        <span>Error...</span>
      )}

      {movies && (
        <>
          <Backdrop path={movies[index].backdrop_path} />

          <div className="w-[40%] h-screen flex justify-center items-center gap-2 bg-gradient-to-r from-black to-[rgba(0,0,0,0.8)] z-10">
            <Transition in={show} timeout={duration}>
              {(state) => (
                <div
                  style={{
                    ...posterStyle,
                    ...posterTransitionStyles[state],
                  }}
                >
                  <Poster path={movies[index].poster_path} />
                </div>
              )}
            </Transition>
          </div>

          <div className="w-[60%] h-screen flex flex-col justify-between py-12 pr-8 bg-black bg-opacity-80 z-10">
            <Transition in={show} timeout={duration}>
              {(state) => (
                <div
                  style={{
                    ...detailStyle,
                    ...detailTransitionStyles[state],
                  }}
                >
                  <Details movie={movies[index]} />
                </div>
              )}
            </Transition>

            <div className="flex items-center gap-4 justify-between">
              <Pagination
                page={page}
                prev={() => {
                  setShow(false);
                  setTimeout(() => {
                    setPage(prevPage => prevPage === 0 ? movies.length - 1 : prevPage - 1);
                    setShow(true);
                  }, duration);
                }}
                next={() => {
                  setShow(false);
                  setTimeout(() => {
                    setPage(prevPage => prevPage === movies.length - 1 ? 0 : prevPage + 1);
                    setShow(true);
                  }, duration);
                }}
              />

              <Button
                prev={() => {
                  setShow(false);
                  setTimeout(() => {
                    setIndex(prevIndex => prevIndex === 0 ? movies.length - 1 : prevIndex - 1);
                    setShow(true);
                  }, duration);
                }}
                next={() => {
                  setShow(false);
                  setTimeout(() => {
                    setIndex(prevIndex => prevIndex === movies.length - 1 ? 0 : prevIndex + 1);
                    setShow(true);
                  }, duration);
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
