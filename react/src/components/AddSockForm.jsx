import { useState } from "react";

const AddSockForm = ({ setSockData }) => {
  // state vars
  const [userId, setUserId] = useState(null);

  const [sockDetails, setSockDetails] = useState({
    size: "",
    color: "",
    pattern: "",
    material: "",
    condition: "",
    forFoot: "",
  });

  const [sockFeatures, setSockFeatures] = useState({
    waterResistant: false,
    padded: false,
    antiBacterial: false,
  });

  // setters
  const handleUserIdChange = (id) => {
    setUserId(id);
  };

  const handleSockDetailsChange = (e) => {
    setSockDetails((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  const handleFeatureChange = (e) => {
    const { name, checked } = e.target;
    setSockFeatures((oldFeatures) => ({
      ...oldFeatures,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const timestamp = Date.now();
    const date = new Date(timestamp);
    const formattedDate = date.toISOString();

    const formJson = {
      userId: "" + userId,
      sockDetails: sockDetails,
      additionalFeatures: sockFeatures,
      addedTimestamp: `${new Date(Date.now()).toISOString()}`,
    };

    try {
      // create a new sock in the database
      if (userId) {
        console.log(JSON.stringify(formJson));

        const response = await fetch(import.meta.env.VITE_SOCKS_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formJson),
        });
        if (!response.ok) {
          alert("Error adding new sock!", response.data);
          throw new Error("Error adding new sock!", response.data);
        }

        alert("Successfully added new sock!");
      } else {
        alert("Error: userId not specified");
      }

      // refetch entire sock database
      try {
        console.log("Refetching entire db");
        const response = await fetch(import.meta.env.VITE_SOCKS_API_URL);
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const json_response = await response.json();
        setSockData(json_response);
      } catch (error) {
        console.error("Error fetching socks:", error);
      }

      // reset form fields and state
      setUserId(null);
      setSockDetails({
        size: "",
        color: "",
        pattern: "",
        material: "",
        condition: "",
        forFoot: "",
      });
      setSockFeatures({
        waterResistant: false,
        padded: false,
        antiBacterial: false,
      });
    } catch (err) {
      console.error("Error: ", err);
    }
  };
  return (
    <form className="p-3" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="userId">User ID</label>
        <input
          type="text"
          className="form-control"
          id="userId"
          name="userId"
          value={userId || ""}
          onChange={(e) => handleUserIdChange(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="size">Size</label>
        <select
          className="form-control"
          id="size"
          name="size"
          value={sockDetails.size}
          onChange={handleSockDetailsChange}
        >
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="color">Color</label>
        <input
          type="text"
          className="form-control"
          id="color"
          name="color"
          value={sockDetails.color}
          onChange={handleSockDetailsChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="pattern">Pattern</label>
        <input
          type="text"
          className="form-control"
          id="pattern"
          name="pattern"
          value={sockDetails.pattern}
          onChange={handleSockDetailsChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="material">Material</label>
        <input
          type="text"
          className="form-control"
          id="material"
          name="material"
          value={sockDetails.material}
          onChange={handleSockDetailsChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="condition">Condition</label>
        <select
          className="form-control"
          id="condition"
          name="condition"
          value={sockDetails.condition}
          onChange={handleSockDetailsChange}
        >
          <option>Used</option>
          <option>New</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="forFoot">For Foot</label>
        <select
          className="form-control"
          id="forFoot"
          name="forFoot"
          value={sockDetails.forFoot}
          onChange={handleSockDetailsChange}
        >
          <option>Left</option>
          <option>Right</option>
          <option>Both</option>
        </select>
      </div>
      <div className="row">
        <div className="form-check col">
          <input
            className="form-check-input"
            type="checkbox"
            id="waterResistant"
            name="waterResistant"
            checked={sockFeatures.waterResistant}
            onChange={handleFeatureChange}
          />
          <label className="form-check-label" htmlFor="waterResistant">
            Water Resistant
          </label>
        </div>
        <div className="form-check col">
          <input
            className="form-check-input"
            type="checkbox"
            id="padded"
            name="padded"
            checked={sockFeatures.padded}
            onChange={handleFeatureChange}
          />
          <label className="form-check-label" htmlFor="padded">
            Padded
          </label>
        </div>
        <div className="form-check col">
          <input
            className="form-check-input"
            type="checkbox"
            id="antiBacterial"
            name="antiBacterial"
            checked={sockFeatures.antiBacterial}
            onChange={handleFeatureChange}
          />
          <label className="form-check-label" htmlFor="antiBacterial">
            Anti Bacterial
          </label>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default AddSockForm;
