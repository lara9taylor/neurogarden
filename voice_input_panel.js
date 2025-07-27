// views/DashboardView.jsx
import React, { useState } from 'react';
import SectionContainer from '../components/SectionContainer';
import SchedulingPanel from '../components/SchedulingPanel';
import TimeAwarenessWidgets from '../components/TimeAwarenessWidgets';
import TemporalMoodTrends from '../components/TemporalMoodTrends';
import DataExportPanel from '../components/DataExportPanel';
import InsightVisualizer from '../components/InsightVisualizer';
import MoodResearchTags from '../components/MoodResearchTags';
import AccessibilitySettingsPanel from '../components/AccessibilitySettingsPanel';
import SafetyAndPrivacyTools from '../components/SafetyAndPrivacyTools';
import VoiceControlsToggle from '../components/VoiceControlsToggle';
import SmartCompanionAgent from '../components/SmartCompanionAgent';
import CuriosityPrompter from '../components/CuriosityPrompter';
import GamifiedMoodQuests from '../components/GamifiedMoodQuests';
import ADHDStimmingPanel from '../components/ADHDStimmingPanel';
import EmotionalSafetyToolkit from '../components/EmotionalSafetyToolkit';
import NeurodivergentSupportDeck from '../components/NeurodivergentSupportDeck';
import GrowthGardenView from '../components/GrowthGardenView';
import DeepInsightEngine from '../components/DeepInsightEngine';
import StoryMode from '../components/StoryMode';
import OnboardingWalkthrough from '../components/OnboardingWalkthrough';
import ExportSetupGuide from '../components/ExportSetupGuide';
import SharePreviewMode from '../components/SharePreviewMode';

const DashboardView = () => {
  return (
    <main className="space-y-6 p-4 bg-gradient-to-br from-green-50 to-purple-50 min-h-screen">
      <OnboardingWalkthrough />

      <SectionContainer title="⏳ Scheduling & Temporal Insights" borderColor="teal-200" textColor="teal-800">
        <SchedulingPanel />
        <TimeAwarenessWidgets />
        <TemporalMoodTrends moodLog={moodLog} />
      </SectionContainer>

      <SectionContainer title="📊 Research & Exports" borderColor="yellow-200" textColor="yellow-800">
        <DataExportPanel journalEntries={journalEntries} moodLog={moodLog} />
        <InsightVisualizer moodLog={moodLog} />
        <MoodResearchTags journalEntries={journalEntries} />
      </SectionContainer>

      <SectionContainer title="🛡️ Accessibility & Safety" borderColor="gray-300" textColor="gray-800">
        <AccessibilitySettingsPanel />
        <SafetyAndPrivacyTools />
        <VoiceControlsToggle />
      </SectionContainer>

      <SectionContainer title="🤖 Smart Agents & Playful Tools" borderColor="pink-300" textColor="pink-800">
        <SmartCompanionAgent />
        <CuriosityPrompter />
        <GamifiedMoodQuests />
      </SectionContainer>

      <SectionContainer title="🌀 Neurodivergent & Emotional Support" borderColor="indigo-300" textColor="indigo-800">
        <ADHDStimmingPanel />
        <EmotionalSafetyToolkit />
        <NeurodivergentSupportDeck />
      </SectionContainer>

      <SectionContainer title="🌱 Experimental Expansions" borderColor="emerald-300" textColor="emerald-800">
        <GrowthGardenView />
        <DeepInsightEngine />
        <StoryMode />
      </SectionContainer>

      <SectionContainer title="📦 Export & Sharing" borderColor="purple-300" textColor="purple-800" blur="md">
        <ExportSetupGuide />
        <SharePreviewMode />
      </SectionContainer>
    </main>
  );
};

export default DashboardView;
