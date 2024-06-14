import { ReactNode } from "react";

interface Log {
  children: ReactNode;
}

const Log = ({ children }: Log) => {
  return (
    <div className="logOutsideWrapper">
      <div className="upperShadowYellow"></div>
      {children}
      <div className="lowerShadowYellow"></div>
    </div>
  );
};

export default Log;
