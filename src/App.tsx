import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const App = () => {
  gsap.registerPlugin(useGSAP);
  return <div>App</div>;
};

export default App;
