import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { EditorTabs } from "../config/constants";
import Tab from "../components/3d/Tab";
import CanvasModel from "../canvas";
import ColorPicker from "../components/3d/ColorPicker";

const Design = () => {
  const [activeTab, setActiveTab] = useState(false);
  const [isClickedTab, setClickedTab] = useState(false);

  return (
    <div>
      <Nav />
      <div style={{ textAlign: "center", padding: "10px" }}>
        <h1
          style={{
            fontSize: "2em",
            fontWeight: "bold",
            color: "rgb(11, 13, 123)",
          }}
        >
          Design Your Bicycle
        </h1>
        <p style={{ color: "#666", maxWidth: "600px", margin: "2rem auto" }}>
          Customize your bicycle to your heart's content. Choose colors, parts,
          and more to make it uniquely yours.
        </p>
      </div>
      <div style={{ height: "100vh" }}>
        <div className="absolute top-0 left-0 z-10">
          <div className="flex items-center min-h-screen">
            <div className="editortabs-container tabs">
              {EditorTabs.map((tab) => (
                <Tab
                  key={tab.name}
                  tab={tab}
                  isClickedTab
                  handleClick={() => {
                    setClickedTab(!isClickedTab);
                    setActiveTab(tab.name);
                  }}
                />
              ))}
              {activeTab === "colorpicker" && isClickedTab && <ColorPicker />}
            </div>
          </div>
        </div>

        <CanvasModel />
      </div>
    </div>
  );
};

export default Design;
