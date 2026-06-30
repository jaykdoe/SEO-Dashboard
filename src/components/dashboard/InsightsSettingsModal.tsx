'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Clock, Sliders, RotateCcw } from 'lucide-react';

export interface InsightsSettings {
  // Daily settings
  clicks: boolean;
  impressions: boolean;
  ctr: boolean;
  position: boolean;
  bestWorstDays: boolean;
  weeklySeasonal: boolean;
  anomalies: boolean;
  correlations: boolean;
  standout: boolean;
  reasons: boolean;
  
  // Query settings
  qTopPerformers: boolean;
  qCtrAnalysis: boolean;
  qPositionOpportunities: boolean;
  qContentGaps: boolean;
  qBrandedAnalysis: boolean;
  qIndustryAnalysis: boolean;
  qAdditionalInsights: boolean;
  qRecommendations: boolean;
}

export const DEFAULT_INSIGHTS_SETTINGS: InsightsSettings = {
  clicks: true,
  impressions: true,
  ctr: true,
  position: true,
  bestWorstDays: true,
  weeklySeasonal: true,
  anomalies: true,
  correlations: true,
  standout: true,
  reasons: true,
  
  qTopPerformers: true,
  qCtrAnalysis: true,
  qPositionOpportunities: true,
  qContentGaps: true,
  qBrandedAnalysis: true,
  qIndustryAnalysis: true,
  qAdditionalInsights: true,
  qRecommendations: true,
};

export const SETTING_TIMES = {
  clicks: 2.0,
  impressions: 2.0,
  ctr: 2.0,
  position: 2.0,
  bestWorstDays: 3.0,
  weeklySeasonal: 4.0,
  anomalies: 4.0,
  correlations: 3.0,
  standout: 3.5,
  reasons: 4.5,
  
  qTopPerformers: 2.5,
  qCtrAnalysis: 2.5,
  qPositionOpportunities: 3.0,
  qContentGaps: 3.5,
  qBrandedAnalysis: 4.0,
  qIndustryAnalysis: 4.0,
  qAdditionalInsights: 3.5,
  qRecommendations: 4.0,
};

interface InsightsSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSettings: InsightsSettings;
  onSave: (settings: InsightsSettings) => void;
}

export default function InsightsSettingsModal({
  isOpen,
  onClose,
  currentSettings,
  onSave,
}: InsightsSettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'daily' | 'queries'>('daily');
  const [tempSettings, setTempSettings] = useState<InsightsSettings>({ ...currentSettings });

  // Update temp settings when currentSettings changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setTempSettings({ ...currentSettings });
    }
  }, [isOpen, currentSettings]);

  const handleToggle = (key: keyof InsightsSettings) => {
    setTempSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSelectAll = (type: 'daily' | 'queries', value: boolean) => {
    setTempSettings((prev) => {
      const updated = { ...prev };
      if (type === 'daily') {
        updated.clicks = value;
        updated.impressions = value;
        updated.ctr = value;
        updated.position = value;
        updated.bestWorstDays = value;
        updated.weeklySeasonal = value;
        updated.anomalies = value;
        updated.correlations = value;
        updated.standout = value;
        updated.reasons = value;
      } else {
        updated.qTopPerformers = value;
        updated.qCtrAnalysis = value;
        updated.qPositionOpportunities = value;
        updated.qContentGaps = value;
        updated.qBrandedAnalysis = value;
        updated.qIndustryAnalysis = value;
        updated.qAdditionalInsights = value;
        updated.qRecommendations = value;
      }
      return updated;
    });
  };

  const handleResetToDefault = () => {
    if (activeTab === 'daily') {
      setTempSettings((prev) => ({
        ...prev,
        clicks: DEFAULT_INSIGHTS_SETTINGS.clicks,
        impressions: DEFAULT_INSIGHTS_SETTINGS.impressions,
        ctr: DEFAULT_INSIGHTS_SETTINGS.ctr,
        position: DEFAULT_INSIGHTS_SETTINGS.position,
        bestWorstDays: DEFAULT_INSIGHTS_SETTINGS.bestWorstDays,
        weeklySeasonal: DEFAULT_INSIGHTS_SETTINGS.weeklySeasonal,
        anomalies: DEFAULT_INSIGHTS_SETTINGS.anomalies,
        correlations: DEFAULT_INSIGHTS_SETTINGS.correlations,
        standout: DEFAULT_INSIGHTS_SETTINGS.standout,
        reasons: DEFAULT_INSIGHTS_SETTINGS.reasons,
      }));
    } else {
      setTempSettings((prev) => ({
        ...prev,
        qTopPerformers: DEFAULT_INSIGHTS_SETTINGS.qTopPerformers,
        qCtrAnalysis: DEFAULT_INSIGHTS_SETTINGS.qCtrAnalysis,
        qPositionOpportunities: DEFAULT_INSIGHTS_SETTINGS.qPositionOpportunities,
        qContentGaps: DEFAULT_INSIGHTS_SETTINGS.qContentGaps,
        qBrandedAnalysis: DEFAULT_INSIGHTS_SETTINGS.qBrandedAnalysis,
        qIndustryAnalysis: DEFAULT_INSIGHTS_SETTINGS.qIndustryAnalysis,
        qAdditionalInsights: DEFAULT_INSIGHTS_SETTINGS.qAdditionalInsights,
        qRecommendations: DEFAULT_INSIGHTS_SETTINGS.qRecommendations,
      }));
    }
  };

  const handleSave = () => {
    onSave(tempSettings);
    onClose();
  };

  // Calculate totals
  const dailyTotal = 
    (tempSettings.clicks ? SETTING_TIMES.clicks : 0) +
    (tempSettings.impressions ? SETTING_TIMES.impressions : 0) +
    (tempSettings.ctr ? SETTING_TIMES.ctr : 0) +
    (tempSettings.position ? SETTING_TIMES.position : 0) +
    (tempSettings.bestWorstDays ? SETTING_TIMES.bestWorstDays : 0) +
    (tempSettings.weeklySeasonal ? SETTING_TIMES.weeklySeasonal : 0) +
    (tempSettings.anomalies ? SETTING_TIMES.anomalies : 0) +
    (tempSettings.correlations ? SETTING_TIMES.correlations : 0) +
    (tempSettings.standout ? SETTING_TIMES.standout : 0) +
    (tempSettings.reasons ? SETTING_TIMES.reasons : 0);

  const queryTotal =
    (tempSettings.qTopPerformers ? SETTING_TIMES.qTopPerformers : 0) +
    (tempSettings.qCtrAnalysis ? SETTING_TIMES.qCtrAnalysis : 0) +
    (tempSettings.qPositionOpportunities ? SETTING_TIMES.qPositionOpportunities : 0) +
    (tempSettings.qContentGaps ? SETTING_TIMES.qContentGaps : 0) +
    (tempSettings.qBrandedAnalysis ? SETTING_TIMES.qBrandedAnalysis : 0) +
    (tempSettings.qIndustryAnalysis ? SETTING_TIMES.qIndustryAnalysis : 0) +
    (tempSettings.qAdditionalInsights ? SETTING_TIMES.qAdditionalInsights : 0) +
    (tempSettings.qRecommendations ? SETTING_TIMES.qRecommendations : 0);

  const activeTotal = activeTab === 'daily' ? dailyTotal : queryTotal;

  // Determine time speed color
  const getTimeBadgeColor = (time: number) => {
    if (time <= 2.5) return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/30';
    if (time <= 3.5) return 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800/30';
    return 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-200 dark:border-rose-800/30';
  };

  const getSpeedClassification = (total: number) => {
    if (total === 0) return { label: 'Empty Report', color: 'text-gray-500' };
    if (total <= 12) return { label: 'Lightning Fast', color: 'text-emerald-500 font-semibold' };
    if (total <= 22) return { label: 'Standard Speed', color: 'text-blue-500 font-semibold' };
    return { label: 'Comprehensive (Heavy Load)', color: 'text-amber-500 font-semibold' };
  };

  const classification = getSpeedClassification(activeTotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-zinc-955/40 backdrop-blur-sm cursor-pointer"
          />

          {/* Settings Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 z-50 h-full w-full sm:w-[500px] bg-white/95 dark:bg-zinc-950/95 border-l border-gray-200 dark:border-zinc-800 shadow-2xl flex flex-col backdrop-blur-md"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center bg-gray-50/50 dark:bg-zinc-900/30">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Sliders size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-955 dark:text-white text-lg">Insights Customizer</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Select options to build your custom AI report</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tab Selector */}
            <div className="px-6 pt-4 flex space-x-1 border-b border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-950">
              <button
                onClick={() => setActiveTab('daily')}
                className={`flex-1 pb-3 text-sm font-medium border-b-2 text-center transition-all ${
                  activeTab === 'daily'
                    ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Daily Traffic Trends
              </button>
              <button
                onClick={() => setActiveTab('queries')}
                className={`flex-1 pb-3 text-sm font-medium border-b-2 text-center transition-all ${
                  activeTab === 'queries'
                    ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Search Query Analysis
              </button>
            </div>

            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeTab === 'daily' ? (
                <>
                  {/* Daily Report Toggle Utilities */}
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Configure Sections</span>
                    <div className="flex items-center space-x-3 text-xs">
                      <button
                        onClick={() => handleSelectAll('daily', true)}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Select All
                      </button>
                      <span className="text-gray-300 dark:text-zinc-700">|</span>
                      <button
                        onClick={() => handleSelectAll('daily', false)}
                        className="text-gray-500 hover:underline"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>

                  {/* Daily Section 1: Daily Traffic Trends */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wide">1. Traffic Metrics</h4>
                    <div className="space-y-2.5">
                      {[
                        { key: 'clicks', label: 'Clicks Analysis', desc: 'Analyzes daily click counts, spikes, drops, and general growth trends.' },
                        { key: 'impressions', label: 'Impressions Analysis', desc: 'Evaluates search presence visibility and total views on Google.' },
                        { key: 'ctr', label: 'CTR Performance', desc: 'Examines patterns in Click-Through Rate and potential listing improvements.' },
                        { key: 'position', label: 'Average Position Tracks', desc: 'Tracks ranking shifts and overall SERP trajectory over time.' }
                      ].map((item) => (
                        <div
                          key={item.key}
                          onClick={() => handleToggle(item.key as keyof InsightsSettings)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
                            tempSettings[item.key as keyof InsightsSettings]
                              ? 'bg-blue-50/30 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800/40'
                              : 'bg-white border-gray-200 hover:border-gray-300 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={!!tempSettings[item.key as keyof InsightsSettings]}
                            readOnly
                            className="mt-1 h-4.5 w-4.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium text-sm text-gray-900 dark:text-zinc-150">{item.label}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getTimeBadgeColor(SETTING_TIMES[item.key as keyof typeof SETTING_TIMES])}`}>
                                +{SETTING_TIMES[item.key as keyof typeof SETTING_TIMES].toFixed(1)}s
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Daily Section 2: Key Observations */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wide">2. Advanced Observations</h4>
                    <div className="space-y-2.5">
                      {[
                        { key: 'bestWorstDays', label: 'Best & Worst Performing Days', desc: 'Identifies high and low performance peaks and contrasts them.' },
                        { key: 'weeklySeasonal', label: 'Weekly Patterns & Seasonal Trends', desc: 'Finds cyclical fluctuations (e.g. weekday vs. weekend patterns).' },
                        { key: 'anomalies', label: 'Significant Changes & Anomalies', desc: 'Uncovers unexpected spikes, drops, or search volume shifts.' },
                        { key: 'correlations', label: 'CTR & Position Correlations', desc: 'Examines how position improvements directly impact CTR.' },
                        { key: 'standout', label: 'Standout Insights & Discoveries', desc: 'Points out unique search behavioral patterns or unexpected wins.' },
                        { key: 'reasons', label: 'Potential Performance Drivers', desc: 'Hypothesizes internal/external causes for traffic differences.' }
                      ].map((item) => (
                        <div
                          key={item.key}
                          onClick={() => handleToggle(item.key as keyof InsightsSettings)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
                            tempSettings[item.key as keyof InsightsSettings]
                              ? 'bg-blue-50/30 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800/40'
                              : 'bg-white border-gray-200 hover:border-gray-300 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={!!tempSettings[item.key as keyof InsightsSettings]}
                            readOnly
                            className="mt-1 h-4.5 w-4.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium text-sm text-gray-900 dark:text-zinc-150">{item.label}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getTimeBadgeColor(SETTING_TIMES[item.key as keyof typeof SETTING_TIMES])}`}>
                                +{SETTING_TIMES[item.key as keyof typeof SETTING_TIMES].toFixed(1)}s
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Queries Report Toggle Utilities */}
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Configure Sections</span>
                    <div className="flex items-center space-x-3 text-xs">
                      <button
                        onClick={() => handleSelectAll('queries', true)}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Select All
                      </button>
                      <span className="text-gray-300 dark:text-zinc-700">|</span>
                      <button
                        onClick={() => handleSelectAll('queries', false)}
                        className="text-gray-500 hover:underline"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>

                  {/* Queries Section 1: Query Performance */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wide">1. Keyword Performance</h4>
                    <div className="space-y-2.5">
                      {[
                        { key: 'qTopPerformers', label: 'Top Query Analysis', desc: 'Identifies the highest traffic-driving queries driving search clicks.' },
                        { key: 'qCtrAnalysis', label: 'Keyword CTR Opportunities', desc: 'Highlights keywords showing unusually high or poor click-through rates.' },
                        { key: 'qPositionOpportunities', label: 'Low-Hanging Fruit Positions', desc: 'Finds keywords with high impressions but average rankings (page 2 optimization).' },
                        { key: 'qContentGaps', label: 'Content Gaps & Intent Needs', desc: 'Detects topics or intent categories where optimization would win quick traffic.' }
                      ].map((item) => (
                        <div
                          key={item.key}
                          onClick={() => handleToggle(item.key as keyof InsightsSettings)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
                            tempSettings[item.key as keyof InsightsSettings]
                              ? 'bg-blue-50/30 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800/40'
                              : 'bg-white border-gray-200 hover:border-gray-300 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={!!tempSettings[item.key as keyof InsightsSettings]}
                            readOnly
                            className="mt-1 h-4.5 w-4.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium text-sm text-gray-900 dark:text-zinc-150">{item.label}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getTimeBadgeColor(SETTING_TIMES[item.key as keyof typeof SETTING_TIMES])}`}>
                                +{SETTING_TIMES[item.key as keyof typeof SETTING_TIMES].toFixed(1)}s
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Queries Section 2: Branded/Industry */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wide">2. Brand & Industry Segments</h4>
                    <div className="space-y-2.5">
                      {[
                        { key: 'qBrandedAnalysis', label: 'Branded Query Evaluation', desc: 'Compares branded keyword metrics directly against general SEO metrics.' },
                        { key: 'qIndustryAnalysis', label: 'Industry & Generic Keywords', desc: 'Analyzes organic search volume to identify industry intent and generic targets.' }
                      ].map((item) => (
                        <div
                          key={item.key}
                          onClick={() => handleToggle(item.key as keyof InsightsSettings)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
                            tempSettings[item.key as keyof InsightsSettings]
                              ? 'bg-blue-50/30 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800/40'
                              : 'bg-white border-gray-200 hover:border-gray-300 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={!!tempSettings[item.key as keyof InsightsSettings]}
                            readOnly
                            className="mt-1 h-4.5 w-4.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium text-sm text-gray-900 dark:text-zinc-150">{item.label}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getTimeBadgeColor(SETTING_TIMES[item.key as keyof typeof SETTING_TIMES])}`}>
                                +{SETTING_TIMES[item.key as keyof typeof SETTING_TIMES].toFixed(1)}s
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Queries Section 3: Recommendations */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wide">3. Action items & Insights</h4>
                    <div className="space-y-2.5">
                      {[
                        { key: 'qAdditionalInsights', label: 'Standout Query Discoveries', desc: 'Identifies unexpected keyword traffic, anomalies, and seasonal spikes.' },
                        { key: 'qRecommendations', label: 'Optimization Recommendations', desc: 'Returns actionable task steps to improve pages and metadata based on intent.' }
                      ].map((item) => (
                        <div
                          key={item.key}
                          onClick={() => handleToggle(item.key as keyof InsightsSettings)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
                            tempSettings[item.key as keyof InsightsSettings]
                              ? 'bg-blue-50/30 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800/40'
                              : 'bg-white border-gray-200 hover:border-gray-300 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={!!tempSettings[item.key as keyof InsightsSettings]}
                            readOnly
                            className="mt-1 h-4.5 w-4.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium text-sm text-gray-900 dark:text-zinc-150">{item.label}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getTimeBadgeColor(SETTING_TIMES[item.key as keyof typeof SETTING_TIMES])}`}>
                                +{SETTING_TIMES[item.key as keyof typeof SETTING_TIMES].toFixed(1)}s
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Bottom Processing Estimate & Buttons */}
            <div className="p-6 border-t border-gray-200 dark:border-zinc-800 bg-gray-50/80 dark:bg-zinc-950/70 flex flex-col space-y-4">
              {/* Dynamic Estimated Processing Time Display */}
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800 flex items-center space-x-3">
                <div className="h-9 w-9 rounded-lg bg-blue-600/10 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Clock size={18} className={activeTotal > 0 ? "animate-pulse" : ""} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-semibold text-gray-500 dark:text-zinc-400">Estimated LLM Time</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">~{activeTotal.toFixed(1)}s</span>
                  </div>
                  {/* Estimated Load Level */}
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className={`text-[10px] font-medium uppercase tracking-wider ${classification.color}`}>
                      {classification.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 text-sm">
                <button
                  onClick={handleResetToDefault}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors flex items-center space-x-2"
                >
                  <RotateCcw size={15} />
                  <span>Reset</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md shadow-blue-500/10 hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Save size={15} />
                  <span>Save Config</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
