import Sock from "./Sock";
import Navigator from "./Navigator";

const Home = (props) => {
  return (
    <>
      <h5>
        <center>Number of socks: {props.sockCount}</center>
      </h5>
      <Navigator
        sockCount={props.sockCount}
        page={props.page}
        setPage={props.setPage}
        pageLimit={props.pageLimit}
        
      />

      <div
        className="card-container"
        style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
      >
        {props.sockData.map((sock) => (
          <Sock key={sock._id} data={sock} handleDelete={props.handleDelete} />
        ))}
      </div>
    </>
  );
};

export default Home;
