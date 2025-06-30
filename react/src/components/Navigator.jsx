import { useState, useEffect } from "react";


const Navigator = ({ sockCount, page, setPage, pageLimit }) => {
  const [disableNext, setDisableNext] = useState(false);
  const [disableBack, setDisableBack] = useState(true);
  const totalPages = Math.ceil(sockCount / pageLimit);

  useEffect(() => {
    setDisableBack(page <= 1);
    setDisableNext(page >= totalPages);
  }, [page, sockCount]);

  const handleBack = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px",
      }}
    >
      <button
        className="btn btn-primary"
        onClick={handleBack}
        disabled={disableBack}
      >
        Back
      </button>
      <button
        className="btn btn-primary"
        onClick={handleNext}
        disabled={disableNext}
      >
        Next
      </button>
    </div>
  );
};

export default Navigator;
