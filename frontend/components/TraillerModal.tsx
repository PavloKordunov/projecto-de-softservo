const TrailerModal = ({trailerUrl, setShowTrailerModal} : {trailerUrl: string, setShowTrailerModal: (value: boolean) => void}) => (
  <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center">
    <div className="relative w-full max-w-4xl ">
    <svg className="w-8 h-8 fill-white absolute -top-10 right-0" onClick={() => setShowTrailerModal(false)}>
        <use href={`/sprite.svg#closeBtnIcon`} />
    </svg>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailerUrl.split('v=')[1]}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="min-h-[500px]"
        ></iframe>
      </div>
    </div>
  </div>
);

export default TrailerModal