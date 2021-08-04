import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const RTCContext = createContext();

const RTCProvider = ({ children }) => {
  const configuration = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      // Prod
      {
        urls: "turn:34.243.91.76:3478?transport=tcp",
        username: "eaglestream",
        credential: "root",
      },
    ],
  };

  const [pc] = useState(new RTCPeerConnection(configuration));

  const value = {
    pc,
  };

  return <RTCContext.Provider value={value}>{children}</RTCContext.Provider>;
};

export const useRTC = () => {
  const context = useContext(RTCContext);

  if (!context) {
    throw new Error("useRTC must be nested in RTCProvider");
  }

  return context;
};

export default RTCProvider;

RTCProvider.propTypes = {
  children: PropTypes.object,
};
