const WyparowaniePasek = ({ wyparowanie = 0, wyparowanieMax = 0 }) => {
  if (wyparowanieMax)
    return (
      <div className="health-bar-container" style={{ width: "100%" }}>
        <div
          className="health-bar"
          style={{
            width: `${(wyparowanie / wyparowanieMax) * 100}%`,
            backgroundColor: "green",
          }}
        ></div>
        <div className="cyfry">
          {wyparowanie}/{wyparowanieMax}
        </div>
      </div>
    );
  else
    return (
      <div
        className="health-bar-container"
        style={{ width: "100%", border: "unset" }}
      ></div>
    );
};

export default WyparowaniePasek;
