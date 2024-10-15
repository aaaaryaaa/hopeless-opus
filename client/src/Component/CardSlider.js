import { styled, keyframes } from "styled-components";
import React, { useRef, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

// gsap imports
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
  margin-top: 15rem;
  margin-left: 50%;
  margin-bottom: 8rem;
  width: fit-content;
  display: flex;
  justify-content: center;
  gap: 4rem;

  @media (max-width: 760px) {
    margin-left: 2em;
    width: 100%;
    padding: 0 1rem;
    flex-direction: column;
    justify-content: center;
    gap: 3rem;
    height: fit-content;
    overflow: hidden;
  }
`;

const DivEventCard = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24rem; /* Increased width */
  height: 24rem; /* Increased height */
  background: linear-gradient(
    159.14deg,
    rgba(1, 1, 1, 0.648) -6.84%,
    rgba(33, 33, 33, 0.443) 118.48%
  );
  border-radius: 1rem;
  border: 1px solid rgba(170, 170, 170, 0.6);
  padding: 3rem 2rem 0 2rem; /* Increased top padding */
  backdrop-filter: blur(2px);

  @media (max-width: 760px) {
    width: 85%;
    height: 42rem; /* Adjusted height for mobile */
    padding: 2rem 1.5rem 0 1.5rem;
  }
`;

const EventCardTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: white;

  @media (max-width: 760px) {
    font-size: 1.3rem;
  }
`;

const EventCardBody = styled.div`
  font-size: 1.2rem;
  line-height: 1.4;
  font-weight: 400;
  word-wrap: wrap;
  color: white;
  margin-top: 1rem;
  border-top: solid 0.2rem rgba(255, 255, 255, 0.2);
  padding-top: 1.2rem;

  @media (max-width: 760px) {
    font-size: 1.2rem;
  }
`;

const DivEventCardBottom = styled.div`
  margin-top: auto;
`;

const CardSlider = React.forwardRef(
  ({ onIntersection = () => {} }, forwardedRef) => {
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
            end: () => "+=" + horizontalScrollingSection.current.offsetWidth,
          },
        });
      });
    });

    const [events, setEvents] = useState([
      {
        ID: 100,
        Name: "📅Game Schedule",
        Desc: `October 17th: 6:30 PM - 11:30 PM<br />
        October 18th: 12:00 AM - 12:00 PM<br />
        October 19th: 7:30 PM - 11:30 PM<br /><br/>Don't miss out on the action!`,
        Date: "R1-(10/4/2024) R2&R3-(11/4/2024)",
        Time: "R1-(8:30pm to 9:30pm) R2-(4pm to 6pm)<br />R3-(9pm)",
        Venue: "R1-(Online) R2-(AB5 312)<br />R3-(*)",
        TeamSize: "3-4",
        PrizePool: 6000,
        isIndividual: false,
        ShortDesc: `October 17th: 6:30 PM - 11:30 PM<br />
        October 18th: 12:00 AM - 12:00 PM<br />
        October 19th: 7:30 PM - 11:30 PM<br />
        <br />Don't miss out!<br />
        Are you ready to play?`,
      },
      {
        ID: 200,
        Name: "🏆Prizes:",
        Desc: `1st Place: Rs 4000<br />2nd Place: Rs 3000<br />3rd Place: Rs 2000<br/><br/><b>Grand Prize Pool: Rs 9000<b> `,
        Date: "06/04/2024 to 08/04/2024",
        Time: "6th Apr 11:59pm to 8th Apr 11:59pm",
        Venue: "Online",
        TeamSize: "1",
        PrizePool: 6000,
        isIndividual: true,
        ShortDesc:
          "1st Place: Rs 4000<br />2nd Place: Rs 3000<br />3rd Place: Rs 2000",
      },
      {
        ID: 300,
        Name: "💪🏼 How to Win",
        Desc: `Accumulate Points: Participate in minigames and make strategic choices.<br/>
Climb the Leaderboard: Track your progress on the live leaderboard<br/>
Are you ready to take the top spot?`,
        Date: "06/04/2024",
        Time: "5pm to 8pm",
        Venue: "AB5 312",
        TeamSize: "1",
        isIndividual: true,
        ShortDesc: `Accumulate Points: Play minigames and make strategic choices.<br />
        Track progress on the leaderboard.<br />Play to win!`,
      },
      {
        ID: 400,
        Name: "⚙ How It Works",
        Desc: `Each minigame has points up for grabs. Your performance directly impacts your story path.<br/>
Prepare for a thrilling adventure where your fate lies in your hands!<br/>
Are you ready to see where your skills will lead you?

`,
        Date: "08/04/2024 to 10/04/2024",
        Time: "8th Apr 8pm to 10th Apr 8pm",
        Venue: "Online",
        TeamSize: "4",
        PrizePool: 5000,
        isIndividual: false,
        ShortDesc: `Minigames offer points and influence story paths.<br />Unfold your unique adventure!`,
      },
      {
        ID: 500,
        Name: "✨ Ready For A Win?",
        Desc: "Prepare for a thrilling adventure where your fate lies in your hands!<br/>Are you ready to see where your skills will lead you?",
        Date: "08/04/2024",
        Time: "5pm to 8pm",
        Venue: "AB5 312",
        TeamSize: "1",
        isIndividual: true,
        ShortDesc: "Unlock web development potential!",
      },
      {
        ID: 600,
        Name: "🎃 Join the Adventure!",
        Desc: `Dive into Hopeless Opus and create your own epic tale!`,
        Date: "07/04/2024",
        Time: "4pm to 6pm",
        Venue: "MIT Campus",
        TeamSize: "3",
        PrizePool: 4000,
        isIndividual: false,
        ShortDesc: `Step into mystery with our exhilarating Treasure Hunt event!`,
      },
    ]);

    return (
      <Section id="event">
        <div ref={horizontalScrollingSection}>
          <DivScrolling>
            <Div>
              {events.map((event) => {
                return (
                  <DivEventCard key={event.ID} className="eventCard">
                    <EventCardTitle>{event.Name}</EventCardTitle>
                    <EventCardBody>
                      <div dangerouslySetInnerHTML={{ __html: event.Desc }} />
                    </EventCardBody>
                    <DivEventCardBottom />
                  </DivEventCard>
                );
              })}
            </Div>
          </DivScrolling>
        </div>
      </Section>
    );
  }
);

export default CardSlider;
