import "./index.css";
import { Composition } from "remotion";
import FlowVsDrain from "./FlowVsDrain";
import ThenVsNow from "./ThenVsNow";
import AIToolCards from "./AIToolCards";
import DependencyHell from "./DependencyHell";
import JobShift from "./JobShift";
import MeetingClock from "./MeetingClock";
import AmazonByNumbers from "./AmazonByNumbers";
import DarkCodeDefinition from "./DarkCodeDefinition";
import GoldmanJobImpact from "./GoldmanJobImpact";
import InfrastructureSpend from "./InfrastructureSpend";
import JudgmentStack from "./JudgmentStack";
import MetaThreeSteps from "./MetaThreeSteps";
import ProcessFailure from "./ProcessFailure";
import ToolOwnershipMap from "./ToolOwnershipMap";
import TwoWorlds from "./TwoWorlds";
import WrapperGraveyard from "./WrapperGraveyard";
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
      <Composition
        id="AmazonByNumbers"
        component={AmazonByNumbers}
        durationInFrames={330}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="DarkCodeDefinition"
        component={DarkCodeDefinition}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="GoldmanJobImpact"
        component={GoldmanJobImpact}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="InfrastructureSpend"
        component={InfrastructureSpend}
        durationInFrames={330}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="JudgmentStack"
        component={JudgmentStack}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MetaThreeSteps"
        component={MetaThreeSteps}
        durationInFrames={330}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ProcessFailure"
        component={ProcessFailure}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ToolOwnershipMap"
        component={ToolOwnershipMap}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TwoWorlds"
        component={TwoWorlds}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="WrapperGraveyard"
        component={WrapperGraveyard}
        durationInFrames={330}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
