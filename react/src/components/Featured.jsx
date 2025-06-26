const Featured = ({ promo_data }) => {

  return (
    <div>
      <h5>Featured</h5>
      <div
        className="card-container d-flex flex-row justify-content-start"
        style={{ gap: "20px", padding: "20px" }}
      >
        {promo_data.map((feature) => (
          <div className="card">
            <div className="card bg-light">
              <div className="card-text">{feature.feature}</div>
              <div className="card=text">
                <a href="#">Click to buy!</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
