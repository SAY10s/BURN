import { ReactNode } from "react";

interface Log {
  children: ReactNode;
}

const Log = ({ children }: Log) => {
  return (
    <div className="logOutsideWrapper">
      <div className="upperShadowYellow"></div>
      <div className="upperShadowWhite"></div>
      {children}
      <div className="lowerShadowWhite"></div>
      <div className="lowerShadowYellow"></div>
    </div>
  );
};

export default Log;
