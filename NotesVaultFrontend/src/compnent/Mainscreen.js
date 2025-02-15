import React from "react";

const mainscreen = () => {
  return (
    <div className="flex" style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>hello</div>
      <div style={{ flex: 1, display: "flex" }}>
        <div style={{ flex: 1, height: "50%" }}>
          <div style={{ height: "50%" }}>aadha</div>
        </div>
        <div style={{ flex: 1, height: "50%" }}>
          <div style={{ height: "50%" }}>poora</div>
        </div>
      </div>
    </div>
  );
};

export default mainscreen;