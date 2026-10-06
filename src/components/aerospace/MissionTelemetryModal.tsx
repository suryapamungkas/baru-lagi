'use client';

import React from 'react';
import { X, Play, ShieldAlert, Activity, Gauge, Radio, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface MissionData {
  missionName: string;
  vehicle: string;
  status: string;
  details: string;
  stats: {
    orbit: string;
    payload: string;
    thrust: string;
    reusability: string;
  };
}

interface MissionTelemetryModalProps {
  mission: MissionData | null;
  onClose: () => void;
}

export function MissionTelemetryModal({ mission, onClose }: MissionTelemetryModalProps) {
  if (!mission) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl rounded-2xl border border-white/20 bg-black/95 p-6 sm:p-10 text-white shadow-2xl z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Mission Tag & Title */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 text-[10px] font-mono tracking-widest text-[#A0A0A0] uppercase mb-3">
              <Radio className="h-3 w-3 text-emerald-400 animate-pulse" />
              <span>TELEMETRY FEED &bull; {mission.vehicle}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-[0.08em] leading-tight text-white">
              {mission.missionName}
            </h3>
            <p className="mt-3 text-sm text-[#A0A0A0] leading-relaxed max-w-2xl">
              {mission.details}
            </p>
          </div>

          {/* Telemetry Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 font-mono">
              <span className="text-[10px] uppercase tracking-widest text-[#A0A0A0] block mb-1">
                TARGET ORBIT
              </span>
              <span className="text-base sm:text-lg font-bold text-white">
                {mission.stats.orbit}
              </span>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 font-mono">
              <span className="text-[10px] uppercase tracking-widest text-[#A0A0A0] block mb-1">
                PAYLOAD MASS
              </span>
              <span className="text-base sm:text-lg font-bold text-white">
                {mission.stats.payload}
              </span>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 font-mono">
              <span className="text-[10px] uppercase tracking-widest text-[#A0A0A0] block mb-1">
                LIFTOFF THRUST
              </span>
              <span className="text-base sm:text-lg font-bold text-white">
                {mission.stats.thrust}
              </span>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 font-mono">
              <span className="text-[10px] uppercase tracking-widest text-[#A0A0A0] block mb-1">
                REUSABILITY
              </span>
              <span className="text-base sm:text-lg font-bold text-emerald-400">
                {mission.stats.reusability}
              </span>
            </div>
          </div>

          {/* Mission Milestones Sequence */}
          <div className="space-y-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A0A0A0] block">
              FLIGHT SEQUENCE MILESTONES
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 border border-white/10 rounded-lg flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>T-00:00:00 Liftoff</span>
              </div>
              <div className="p-3 border border-white/10 rounded-lg flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>T+00:02:42 Stage Sep</span>
              </div>
              <div className="p-3 border border-white/10 rounded-lg flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>T+00:08:35 Booster Catch</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <span className="text-xs font-mono text-[#A0A0A0]">
              STATUS: <strong className="text-white">{mission.status}</strong>
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto border border-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-all"
              >
                CLOSE TELEMETRY
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
