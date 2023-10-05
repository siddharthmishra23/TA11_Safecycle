import React from "react";
import { useSnapshot } from "valtio";
import state from "../../store";
const Tab = ({ tab, key, handleClick, isClickedTab }) => {
  const snap = useSnapshot(state);
  const activestyles = isClickedTab
    ? { backgroundColor: snap.color, opacity: 0.5 }
    : { backgroundColor: "transparent", opacity: 1 };
  return (
    <div
      key={tab.name}
      className={`tab-btn rounded-4`}
      onClick={handleClick}
      style={activestyles}
    >
      <img src={tab.icon} />
    </div>
  );
};

export default Tab;
