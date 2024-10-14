import styled from "styled-components";
import { useState, useEffect } from "react";
import image1 from "./Resources/imposter.jpg";
import image2 from "./Resources/image.png";

const getGalleryImages = () => {
  return [
    {
      id: 1,
      image: "https://res.cloudinary.com/diswj8gya/image/upload/v1728922227/Screenshot_2024-10-14_214012_lez3nw.png",
      alt: "Image 1",
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/diswj8gya/image/upload/v1728922195/Screenshot_2024-10-14_213938_c269ru.png",
      alt: "Image 2",
    }, 
    {
      id: 3,
      image: "https://res.cloudinary.com/diswj8gya/image/upload/v1728922144/Screenshot_2024-10-14_213845_ffxwpd.png",
      alt: "Image 3",
    },
  ];
};

const galleryImages = getGalleryImages();

const Div = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const GalleryImage = styled(({ isActive, isNext, isPrev, ...rest }) => (
  <img {...rest} />
))`
  --next-prev-translate: clamp(5.5rem, 15vw, 17.5rem);

  position: absolute;
  width: ${(props) =>
    props.isActive ? "50vw" : "45vw"}; /* Increased for better visibility */
  height: ${(props) =>
    props.isActive ? "40vh" : "35vh"}; /* Increased for better visibility */
  object-fit: cover;
  border-radius: 1rem;

  z-index: ${(props) => (props.isActive ? 3 : 2)};
  opacity: ${(props) => (props.isActive ? 1 : 0.8)}; /* Increased opacity */
  filter: ${(props) =>
    props.isActive
      ? "brightness(1)"
      : "brightness(0.8)"}; /* Increased brightness */

  transform: ${(props) =>
    props.isActive
      ? "scale(1.1) translateX(0)"
      : props.isNext
      ? "scale(0.9) translateX(var(--next-prev-translate))" /* Increased scale */
      : props.isPrev
      ? "scale(0.9) translateX(calc(-1 * var(--next-prev-translate)))" /* Increased scale */
      : "scale(0.6)"};

  transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out,
    z-index 0.8s ease-in-out;

  @media (max-width: 760px) {
    width: ${(props) =>
      props.isActive ? "80vw" : "65vw"}; /* Increased for better visibility */
    height: ${(props) =>
      props.isActive ? "50vh" : "45vh"}; /* Increased for better visibility */
    transform: ${(props) =>
      props.isActive
        ? "scale(1.1) translateX(0)"
        : props.isNext
        ? "scale(0.9) translateX(var(--next-prev-translate))"
        : props.isPrev
        ? "scale(0.9) translateX(calc(-1 * var(--next-prev-translate)))"
        : "scale(0.6)"};
  }
`;

const calcIndices = (currIndex, arrayLength) => {
  const prevIndex = (currIndex - 1 + arrayLength) % arrayLength;
  const nextIndex = (currIndex + 1) % arrayLength;
  return { prevIndex, nextIndex };
};

const interval = 4000;

export default function GallerySlider() {
  const [currImage, setCurrImage] = useState(0);

  const { prevIndex, nextIndex } = calcIndices(currImage, galleryImages.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrImage((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  return (
    <Div>
      {galleryImages.map((imageItem, index) => (
        <GalleryImage
          key={index}
          src={imageItem.image}
          alt={imageItem.alt}
          isActive={index === currImage}
          isPrev={index === prevIndex}
          isNext={index === nextIndex}
        />
      ))}
    </Div>
  );
}
