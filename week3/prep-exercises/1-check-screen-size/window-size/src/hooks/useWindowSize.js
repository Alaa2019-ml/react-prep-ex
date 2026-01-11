import { useState, useEffect, useRef, useDebugValue } from "react";

const randomFromArr = (arr) => arr[Math.floor(Math.random() * arr.length)];

const makeRandomOutfit = () => {
  const hats = ["none", "beanie", "turban"];
  const hatColors = ["white", "blue", "black", "green", "red"];
  const accessories = ["none", "roundGlasses", "tinyGlasses", "shades"];
  const clothing = [
    "naked",
    "shirt",
    "dressShirt",
    "vneck",
    "tankTop",
    "dress",
  ];
  const clothingColors = ["white", "blue", "black", "green", "red"];
  const graphics = ["none", "redwood", "gatsby", "vue", "react", "graphQL"];

  return {
    hat: randomFromArr(hats),
    hatColor: randomFromArr(hatColors),
    accessory: randomFromArr(accessories),
    clothing: randomFromArr(clothing),
    clothingColor: randomFromArr(clothingColors),
    graphic: randomFromArr(graphics),
  };
};

const getWindowSize = (width) => {
  if (width > 1000) return "big";
  else if (width < 700) return "small";
  return "medium";
};

export function useWindowSize(label = "WindowSize") {
  const [innerWidth, setInnerWidth] = useState(
    typeof window === "undefined" ? 0 : window.innerWidth
  );
  const [innerHeight, setInnerHeight] = useState(
    typeof window === "undefined" ? 0 : window.innerHeight
  );

  const [avatarBig, setAvatarBig] = useState({
    body: "chest",
    eyebrows: "leftLowered",
    eyes: "happy",
    lashes: false,
    mask: false,
    faceMask: true,
    mouth: "openSmile",
    skinTone: "brown",
    ...makeRandomOutfit(),
  });
  const [avatarMedium, setAvatarMedium] = useState({
    body: "breasts",
    circleColor: "green",
    eyebrows: "concerned",
    eyes: "normal",
    hair: "bun",
    hairColor: "brown",
    lashes: false,
    mask: false,
    faceMask: true,
    mouth: "openSmile",
    skinTone: "yellow",
    ...makeRandomOutfit(),
  });
  const [avatarSmall, setAvatarSmall] = useState({
    body: "chest",
    eyebrows: "serious",
    eyes: "squint",
    facialHair: "mediumBeard",
    lashes: true,
    lipColor: "pink",
    mask: false,
    faceMask: false,
    mouth: "lips",
    skinTone: "black",
    ...makeRandomOutfit(),
  });

  const screenType = getWindowSize(innerWidth);

  useDebugValue(`${label}: ${screenType} (${innerWidth}x${innerHeight})`);

  //stores previous screen type
  const prevTypeRef = useRef(screenType);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const nextType = getWindowSize(w);

      setInnerWidth(w);
      setInnerHeight(h);

      if (nextType !== prevTypeRef.current) {
        prevTypeRef.current = nextType;

        if (nextType === "big") {
          setAvatarBig((prev) => ({ ...prev, ...makeRandomOutfit() }));
        } else if (nextType === "medium") {
          setAvatarMedium((prev) => ({ ...prev, ...makeRandomOutfit() }));
        } else {
          setAvatarSmall((prev) => ({ ...prev, ...makeRandomOutfit() }));
        }
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let activeAvatar = avatarMedium; // default
  if (screenType === "big") activeAvatar = avatarBig;
  else if (screenType === "small") activeAvatar = avatarSmall;

  return { innerWidth, innerHeight, screenType, activeAvatar };
}
