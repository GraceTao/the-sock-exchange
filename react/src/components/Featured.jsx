import Feature from "./Feature";

const Featured = ({ promo_data }) => {
  return (
    <div>
      <h5>Featured</h5>
      <div
        className="card-container d-flex flex-row justify-content-start"
        style={{ gap: "20px", padding: "20px" }}
      >
        {promo_data.map((feature) => (
          <Feature key={feature.id} feature={feature.feature} />
        ))}
      </div>
    </div>
  );
};

export default Featured;
