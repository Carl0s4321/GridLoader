import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { regions } from "./constants/regions";
import { hero, images } from "./assets";

function getImageSet() {
  const shuffled = [...images].sort(() => Math.random() - 0.5);
  const sliced = shuffled.slice(0, 9);

  const rows = [];

  for (let i = 0; i < sliced.length; i += 3) {
    rows.push(sliced.slice(i, i + 3));
  }
  return rows;
}

const App = () => {
  gsap.registerPlugin(useGSAP);

  const [rows, setRows] = useState<string[][]>(getImageSet());

  useEffect(() => {
    console.log("rows", rows);
  }, [rows]);

  function startImgRotation() {
    console.log("RUNNING");
    const totalCycles = 30;
    for (let cycle = 0; cycle < totalCycles; cycle++) {
      const rows = getImageSet();
      gsap.to(
        {},
        {
          ease: "hop",
          duration: 0,
          delay: cycle * 0.1,
          onComplete: () => {
            if (cycle === totalCycles - 1) {
              rows[1][1] = hero;
            }
            setRows(rows);
          },
        }
      );
    }
  }

  useGSAP(() => {
    const overlayTimeline = gsap.timeline();
    const imagesTimeline = gsap.timeline();

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
          onComplete: () => {
            imagesTimeline
              .to(".img-container img", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)",
                // duration: 0.5,
                // stagger: 0.25,
                ease: "power2.out",
                onStart: () => {
                  setTimeout(() => {
                    startImgRotation();
                  }, 1000);
                },
                onComplete: () => {
                  imagesTimeline.to(".img-container img:not(.hero-img)", {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0 0%)",
                    ease: "power3.out",
                    delay: 3.8,
                  });

                  imagesTimeline.to(".hero-img", {
                    y: -50,
                    duration: 1,
                    ease: "hop",
                  });
                },
              })
              .to(
                ".logo h1",
                {
                  opacity: 0,
                },
                "<"
              );
          },
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
          //   onComplete
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

      {/* 3x3 */}
      <div className="image-grid">
        {rows.map((row, rowI) => (
          <div className="grid-row" key={rowI}>
            {row.map((img, i) => (
              <div
                key={i}
                className={`img-container ${
                  rowI === 1 && i === 1 ? "hero-img" : ""
                }`}
              >
                <img src={img} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
