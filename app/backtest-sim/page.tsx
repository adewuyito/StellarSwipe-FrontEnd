"use client"

import React from "react";
import BacktestTool from "../../components/BacktestTool";

export default function BacktestPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Signal Backtesting Simulation</h1>
      <BacktestTool />
    </div>
  );
}
