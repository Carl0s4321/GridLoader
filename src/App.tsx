import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { regions } from "./constants/regions";

const App = () => {
  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    const overlayTimeline = gsap.timeline();

    overlayTimeline
      .to(".logo-line-1 h1", {
        backgroundPosition: "0% 0%",
        duration: 0.5,
        ease: "none",
      })
      .to(
        ".logo-line-2 h1",
        {
          backgroundPosition: "0% 0%",
          duration: 0.5,
          ease: "none",
        },
        ">"
      );

    overlayTimeline
      .to([".regions-header", ".regions-item"], {
        opacity: 1,
        duration: 0.075,
        stagger: 0.05,
      })
      .to(
        [".locations-header", ".locations-item"],
        {
          opacity: 1,
          duration: 0.075,
          stagger: 0.05,
        },
        // start at same time as before
        "<"
      );

    overlayTimeline
      .to(".regions-item > *", {
        color: "white",
        duration: 0.075,
        stagger: { amount: 1.25 },
      })
      .to(
        ".locations-item > *",
        {
          color: "white",
          duration: 0.075,
          stagger: { amount: 1.25 },
        },
        "<"
      );

      overlayTimeline
      .to([".regions-header", ".regions-item"], {
        opacity: 0,
        duration: 0.075,
        stagger: 0.05,
      })
      .to(
        [".locations-header", ".locations-item"],
        {
          opacity: 0,
          duration: 0.075,
          stagger: 0.05,
        },
        // start at same time as before
        "<"
      );
  });

  return (
    <div className="parent">
      <div className="logo">
        <div className="logo-line-1">
          <h1>city of</h1>
        </div>
        <div className="logo-line-2">
          <h1>calgary</h1>
        </div>
      </div>
      <div className="regions-container">
        <div className="regions-header">
          <h3>Communities</h3>
          <h3>Areas</h3>
        </div>
        {regions.map((region, i) => (
          <div key={i} className="regions-item">
            <p>{region.name}</p>
            <p>{region.neighborhood}</p>
          </div>
        ))}
      </div>
      <div className="locations-container">
        <div className="locations-header">
          <h3>locations</h3>
        </div>
        {regions.map((region, i) => (
          <div key={i} className="locations-item">
            <p>{region.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
