import "./index.css";
import { Composition } from "remotion";
import { TitleCard } from "./TitleCard";
import { TrumpQuote } from "./TrumpQuote";
import { CompaniesAtStake } from "./CompaniesAtStake";
import { GovVsPrivate } from "./GovVsPrivate";
import { NinetyDayTimeline } from "./NinetyDayTimeline";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TitleCard"
        component={TitleCard}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TrumpQuote"
        component={TrumpQuote}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CompaniesAtStake"
        component={CompaniesAtStake}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="GovVsPrivate"
        component={GovVsPrivate}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="NinetyDayTimeline"
        component={NinetyDayTimeline}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
