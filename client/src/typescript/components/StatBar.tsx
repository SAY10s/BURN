import React from "react";

interface StatBarProps {
  statValue: number;
  statMax: number;
  barColor: string;
}

const StatBar: React.FC<StatBarProps> = ({ statValue, statMax, barColor }) => {
  const statPercent = statValue > 0 ? (statValue / statMax) * 100 : 0;

  return (
    <div className="stat-bar-container">
      <div
        className="stat-bar"
        style={{
          width: `${statPercent <= 100 ? statPercent : "100"}%`,
          backgroundColor: barColor,
        }}
      ></div>
      <div className={`cyfry ${statPercent < 60 ? "under60percent" : ""} `}>
        {statValue > 0 ? statValue : 0}/{statMax}
      </div>
    </div>
  );
};

export default StatBar;
