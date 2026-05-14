import "./index.css";
import { Composition } from "remotion";
import FlowVsDrain from "./FlowVsDrain";
import ThenVsNow from "./ThenVsNow";
import AIToolCards from "./AIToolCards";
import DependencyHell from "./DependencyHell";
import JobShift from "./JobShift";
import MeetingClock from "./MeetingClock";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="FlowVsDrain"
        component={FlowVsDrain}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ThenVsNow"
        component={ThenVsNow}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AIToolCards"
        component={AIToolCards}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="DependencyHell"
        component={DependencyHell}
        durationInFrames={210}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="JobShift"
        component={JobShift}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MeetingClock"
        component={MeetingClock}
        durationInFrames={210}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
