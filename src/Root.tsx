import "./index.css";
import { Composition } from "remotion";
import { TitleCard } from "./TitleCard";
import { TrumpQuote } from "./TrumpQuote";
import { CompaniesAtStake } from "./CompaniesAtStake";
import { GovVsPrivate } from "./GovVsPrivate";
import { NinetyDayTimeline } from "./NinetyDayTimeline";
import { AIBanReversal } from "./AIBanReversal";
import { MicrosoftCancels } from "./MicrosoftCancels";
import { NvidiaComputeCost } from "./NvidiaComputeCost";
import { UberBudgetBurn } from "./UberBudgetBurn";
import { CostOptimizationTakeaway } from "./CostOptimizationTakeaway";
import { RealCompanyBudgetCrack } from "./RealCompanyBudgetCrack";
import { AINotCheap } from "./AINotCheap";
import { TenXRequiresEducation } from "./TenXRequiresEducation";

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
      <Composition
        id="AIBanReversal"
        component={AIBanReversal}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MicrosoftCancels"
        component={MicrosoftCancels}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="NvidiaComputeCost"
        component={NvidiaComputeCost}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="UberBudgetBurn"
        component={UberBudgetBurn}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CostOptimizationTakeaway"
        component={CostOptimizationTakeaway}
        durationInFrames={310}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="RealCompanyBudgetCrack"
        component={RealCompanyBudgetCrack}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AINotCheap"
        component={AINotCheap}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TenXRequiresEducation"
        component={TenXRequiresEducation}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
