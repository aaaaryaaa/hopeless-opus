import { styled, keyframes } from "styled-components";
import React, { useRef, useState, useEffect } from "react";
import { MdArrowOutward } from "react-icons/md";
import { useInView } from "react-intersection-observer";

//gsap imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`

  @media (max-width: 500px) {
    padding: 0;
  }
`;

const DivScrolling = styled.div`
  overflow-x: hidden;
`;

const Div = styled.div`
  margin-top: 10rem; 
  // margin-top: max(15rem, calc((100vh - 44rem) / 2));
  margin-left: 55%;
 margin-bottom: 10rem;
  width: fit-content;
  display: flex;
  justify-content: center;
  gap: 5rem;

  @media (max-width:760px) {
    margin-left: 3em;
    width: 100%;
    padding: 0 1.0rem;
    flex-direction: column;
    justify-content: center;
    gap: 5rem;
    height: fit-content;
    overflow: hidden;
  }
`;

const DivEventCard = styled.div`
  /* margin: 4rem auto; */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30rem;
  height: 30rem;
  background: linear-gradient(
    159.14deg,
    rgba(1, 1, 1, 0.648) -6.84%,
    rgba(33, 33, 33, 0.443) 118.48%
  );
  border-radius: 1rem;
  border: 1px solid rgba(170, 170, 170, 0.6);
  @media (max-width: 760px) {
    width: 80%;
    height: 50rem;
    padding: 1rem 2rem 0 2rem;

  }
  padding: 3rem 3rem 0 3rem;
  backdrop-filter: blur(2px);
`;

const EventCardTitle = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  color: white;
  @media (max-width: 760px) {
    font-size: 1.5rem;
  }
`;

const EventCardBody = styled.div`
  font-size: 1.5rem;
  line-height: 1.4;
  font-weight: 400;
  word-wrap: wrap;
  color: white;
  @media (max-width: 760px) {
    font-size: 1.5rem;
    line-height: 1.4;
  }
  margin-top: 1rem;
  border-top: solid 0.2rem rgba(255, 255, 255, 0.2);
  padding-top: 1.5rem;
`;

const DivEventCardBottom = styled.div`
  margin-top: auto;
`;

const EventCardLine = styled.div`
  border-bottom: solid 0.2rem rgba(255, 255, 255, 0.2);
  font-size: 1.5rem;
  // padding-top: 2rem;
  padding-bottom: 1.4rem;
  label {
    color: #9882f8;
  }
  span {
    color: #fff;
  }
`;

const EventDate = styled.div`
  font-size: 1.2rem;
  font-weight: 375;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 760px) {
    font-size: 1rem;
    padding: 1rem 0.5rem;
  }
`;

const EventCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6.2rem;
`;

const HighlightButton = keyframes`
  to {
    border: 0.1rem solid rgba(255, 255, 255, 1);
  }
`;

const ExpandEventButton = styled.button`
  width: 3.5rem;
  height: 2.5rem;
  /* margin-right: 4rem; */
  border-radius: 2.5rem;
  border: 0.1rem solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(
    93.71deg,
    #202020 0%,
    rgba(32, 32, 32, 0.69) 107.41%
  );
  color: white;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    animation: ${HighlightButton} 0.15s linear 1 forwards;
  }
  @media (max-width: 760px) {
    font-size: 2.6rem;
    width: 6rem;
    // padding-bottom: 2rem;
  }
`;

const CardSlider = React.forwardRef(({ onIntersection = () => { } }, forwardedRef) => {
  const [ref, inView] = useInView({
    onChange: (inView) => {
      if (inView) {
        onIntersection();
      }
    },
  });

  const horizontalScrollingSection = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 760px)", () => {
      let eventCards = gsap.utils.toArray(".eventCard");
      gsap.to(eventCards, {
        xPercent: -110 * eventCards.length,
        ease: "none",
        scrollTrigger: {
          trigger: horizontalScrollingSection.current,
          pin: true,
          scrub: 1,
          // snap: 1 / (eventCards.length - 1),

          end: () => "+=" + horizontalScrollingSection.current.offsetWidth,
        },
      });
    });
  });

  const [events, setEvents] = useState(
    [
      {
        "ID": 100,
        "Name": "Codalympics",
        "Desc": "During the event Participants will be engaged in debugging coding challenges by identifying and rectifying errors in the code. Analysing datasets to develop algorithms based on two sample input-output pairs. Teams will collaborate in a code relay challenge, where members take turns in solving complex coding problems.",
        "Date": "R1-(10/4/2024) R2&R3-(11/4/2024)",
        "Time": "R1-(8:30pm to 9:30pm) R2-(4pm to 6pm)\nR3-(9pm)",
        "Venue": "R1-(Online) R2-(AB5 312)\nR3-(*)",
        "Team Size": "3-4",
        "Prize Pool": 6000,
        "isIndividual": false,
        "ShortDesc": "Codalympics consists of three rounds: Debug the code, analysing data and creating algorithms, and a code relay challenge to test participants' coding skills."
      },
      {
        "ID": 200,
        "Name": "NeuralClash",
        "Desc": "Step into the captivating world of NeuralClash, where innovation meets friendly competition! Dive into the exciting realm of image classification, where participants of all backgrounds are welcomed with open arms. Join us for a thrilling journey filled with challenges, learning, and the chance to connect with fellow enthusiasts in a vibrant and supportive community.",
        "Date": "06/04/2024 to 08/04/2024",
        "Time": "6th Apr 11:59pm to 8th Apr 11:59pm",
        "Venue": "Online",
        "Team Size": "1",
        "Prize Pool": 6000,
        "isIndividual": true,
        "ShortDesc": "Join NeuralClash: A thrilling image classification competition for everyone! Dive in to test your ML skills, learn, and connect with fellow enthusiasts."
      },
      {
        "ID": 300,
        "Name": "Neural Dreams",
        "Desc": "Dive into the fascinating world of Neural Networks basics alongside Convolutional Neural Networks (CNNs) and Neural Style Transfer (NST) in our workshop. Explore how AI drives innovative artistic expression, blurring the boundaries between technology and creativity.",
        "Date": "06/04/2024",
        "Time": "5pm to 8pm",
        "Venue": "AB5 312",
        "Team Size": "1",
        "isIndividual": true,
        "ShortDesc": "Unlock creative potential with our workshop on Neural Networks basics, CNNs, and NST, fostering innovative artistic expression through AI."
      },
      {
        "ID": 400,
        "Name": "DreamForge",
        "Desc": "Enter the captivating realm of DreamForge where creativity meets competition! Immerse yourself in the magic of web development by crafting dreamy full-stack applications using our carefully curated list of APIs fueled by your imagination and experiences from the workshop. You will compete to craft the most innovative dream-inspired applications, showcasing the power of imagination in action.",
        "Date": "08/04/2024 to 10/04/2024",
        "Time": "8th Apr 8pm to 10th Apr 8pm",
        "Venue": "Online",
        "Team Size": "4",
        "Prize Pool": 5000,
        "isIndividual": false,
        "ShortDesc": "Backend focused Web Development competition with our curated list of APIs. We also have a workshop to help you get started."
      },
      {
        "ID": 500,
        "Name": "DevForge",
        "Desc": "Discover the art of web development in our immersive DreamForge workshop. Explore and learn the fundamentals of APIs with demos and hands-on activities. Quench your curiosity as you prepare to craft dream-inspired applications. Join us for an interactive learning experience filled with innovation and imagination.",
        "Date": "08/04/2024",
        "Time": "5pm to 8pm",
        "Venue": "AB5 312",
        "Team Size": "1",
        "isIndividual": true,
        "ShortDesc": "Unlock the power of backend development at our API-focused workshop! Join us for a hands-on session where you'll dive deep into building robust APIs and unleash your potential as a backend developer."
      },
      {
        "ID": 600,
        "Name": "VoltVoyage",
        "Desc": "Set sail on an electrifying journey through 'Voltvoyage', our transcendent hackathon exploring the realms of electronics! Join us for a hackathon journey into electronics exploration. Navigate hardware and simulation challenges, showcasing your creativity in crafting circuits. Come aboard for an exciting experience where innovation meets technology!!",
        "Date": "09/04/2024",
        "Time": "5pm to 8pm",
        "Venue": "Electronics Lab 1",
        "Team Size": "1-3",
        "Prize Pool": 5000,
        "isIndividual": false,
        "ShortDesc": "VoltVoyage: Powering the Journey of Innovation! Step into a world of limitless possibilities at our lively hackathon and immerse yourself in hands-on experiences with cool electronics."
      },
      {
        "ID": 700,
        "Name": "Commsync",
        "Desc": "Discover the intricacies of antenna-based communication, learning to navigate the invisible waves that connect our dreams. Uncover the potential of antennas in our engaging workshop. Explore practical design insights and applications for real-world innovation. ",
        "Date": "09/04/2024",
        "Time": "5pm to 8pm",
        "Venue": "Electronics Lab 1",
        "Team Size": "1",
        "isIndividual": true,
        "ShortDesc": "Commsync: Explore the wonders of antenna-based communication in our workshop where dreams connect imaginative minds, fostering creativity and innovation."
      },
      {
        "ID": 800,
        "Name": "Questscape",
        "Desc": "Teams join a three-round treasure hunt:\n1. Round 1: Teams watch a video with a blurry slideshow revealing riddle answers and receive the first hint. They focus on the video and solve a technical question and a riddle on a placard.\n2. Round 2: Teams solve a riddle to locate a place with a QR code locked by the previous round's technical question answer. Unlocking reveals the 2nd placard with new questions.\n3. Round 3: Teams complete a dare with video/photo proof. Requesting video rewatch deducts points.",
        "Date": "07/04/2024",
        "Time": "4pm to 6pm",
        "Venue": "MIT Campus",
        "Team Size": "3",
        "Prize Pool": 4000,
        "isIndividual": false,
        "ShortDesc": "Step into the realm of mystery and adventure with our exhilarating Treasure Hunt event! Delve into the enigmatic depths of the unknown as you and your team embark on a journey."
      }
    ]

  );


  return (
    <Section id="event">
      <div ref={forwardedRef}>
        <DivScrolling ref={horizontalScrollingSection}>
          <Div ref={ref}>
            {Array.from({ length: 8 }).map((_, index) => (
              <DivEventCard key={index} className="eventCard">
                <EventCardTitle>{events && events[index].Name}</EventCardTitle>
                <EventCardBody>
                  {events && events[index].ShortDesc}
                </EventCardBody>
                <DivEventCardBottom>
                  <EventCardLine>
                    {events && events[index]["Prize Pool"] && (
                      <div>
                        <label>Prize Pool: </label>
                        <span>
                          &#8377;{events && events[index]["Prize Pool"]}
                        </span>
                      </div>
                    )}
                  </EventCardLine>
                  <EventCardFooter>
                    <EventDate>{events && events[index].Date}</EventDate>
                    <Link to={`/events`} state={{ eventIndex: index }}>
                      <ExpandEventButton>
                        <MdArrowOutward />
                      </ExpandEventButton>
                    </Link>
                  </EventCardFooter>
                </DivEventCardBottom>
              </DivEventCard>
            ))}
          </Div>
        </DivScrolling>
      </div>
    </Section>
  );
});

CardSlider.displayName = "CardSlider";

export default CardSlider;
