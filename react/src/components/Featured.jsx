const Featured = () => {
  const sockFeatures = [
    "Moisture-wicking fabric",
    "Compression technology",
    "Anti-odor technology",
    "Eco-friendly materials",
  ];

  return (
    <div>
      <h5>Featured</h5>
      <div
        className="card-container d-flex flex-row justify-content-start"
        style={{ gap: "20px", padding: "20px" }}
      >
        {sockFeatures.map((feature) => (
          <div className="card">
            <div className="card bg-light">
              <div className="card-text">{feature}</div>
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
