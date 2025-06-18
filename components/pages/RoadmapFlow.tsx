import React, { useCallback, useMemo, useState, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Position,
  Handle,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  generateMonthWisePlan,
  generateWeeklyBreakdown,
} from "@/utils/generateRoadmap";
import { RoadmapInput } from "@/types/roadmapTypes";
import { Button } from "@/components/ui/button";
import TaskTracker from "@/components/TaskTracker";

const CustomNode = ({
  data,
  selected,
}: {
  data: { label: string; subtitle?: string; onClick?: () => void };
  selected: boolean;
}) => {
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <div
      className={`
        px-4 py-3 rounded-xl border-2 transition-all duration-300 ease-out cursor-pointer
        ${
          selected
            ? isDark
              ? "bg-blue-900/30 border-blue-400 shadow-lg shadow-blue-500/20 scale-105"
              : "bg-blue-50 border-blue-300 shadow-lg shadow-blue-200/50 scale-105"
            : isDark
            ? "bg-gray-800/90 border-gray-600 shadow-md hover:bg-gray-700/90 hover:border-gray-500 hover:shadow-lg"
            : "bg-white border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-300 hover:shadow-md"
        }
        w-[200px] h-[80px] backdrop-blur-sm relative flex items-center justify-center
      `}
      onClick={data.onClick}
    >
      <div className="text-center w-full">
        <div
          className={`font-semibold text-sm leading-tight ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {data.label}
        </div>
        {data.subtitle && (
          <div
            className={`text-xs mt-1 font-medium line-clamp-2 ${
              isDark ? "text-gray-300" : "text-gray-500"
            }`}
          >
            {data.subtitle}
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!w-0 !h-0 !bg-transparent"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="!w-0 !h-0 !bg-transparent"
      />
    </div>
  );
};

// Move nodeTypes outside component and memoize it
const nodeTypes = {
  custom: CustomNode,
};

const getInitialNodesAndEdges = (
  roadmapInput: RoadmapInput,
  onSelectMonth: (index: number) => void
) => {
  const monthPlans = generateMonthWisePlan(
    roadmapInput.goal,
    roadmapInput.skillLevel,
    Number(roadmapInput.months)
  );

  const nodes = [];
  const edges: Edge[] = [];

  // Root node (Goal) - positioned on the left
  nodes.push({
    id: "root",
    type: "custom",
    data: {
      label: roadmapInput.goal,
      subtitle: `${roadmapInput.skillLevel} Level${
        roadmapInput.targetCompaniesOrRoles
          ? ` • ${roadmapInput.targetCompaniesOrRoles}`
          : ""
      }`,
    },
    position: { x: 100, y: 300 },
  });

  // Month Nodes - Arranged in a vertical column to the right of goal
  monthPlans.forEach((month, i) => {
    const monthId = `month-${month.month}`;
    const posX = 450; // Fixed X position for vertical column
    const posY = 100 + i * 120; // Vertical spacing

    nodes.push({
      id: monthId,
      type: "custom",
      data: {
        label: `Month ${month.month}`,
        subtitle: month.title,
        onClick: () => onSelectMonth(i),
      },
      position: { x: posX, y: posY },
    });

    // Connect root to each month individually
    edges.push({
      id: `edge-root-${monthId}`,
      source: "root",
      target: monthId,
      type: "smoothstep",
      style: {
        stroke: "#3B82F6",
        strokeWidth: 2,
        strokeDasharray: "5,5",
      },
      animated: true,
    });
  });

  return { nodes, edges, monthPlans };
};

// // Mock roadmap input for demo
// const mockRoadmapInput = {
//   goal: "Digital Logic Design",
//   skill_level: "Beginner",
//   months: 6
// };

export default function RoadmapFlow({
  roadmapInput,
}: {
  roadmapInput: RoadmapInput;
}) {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number | null>(
    null
  );
  const [selectedWeekIndex, setSelectedWeekIndex] = useState<number | null>(
    null
  );
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showWeeklyNodes, setShowWeeklyNodes] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [selectedTaskWeekIndex, setSelectedTaskWeekIndex] = useState<
    number | null
  >(null);

  // Save roadmap to localStorage when it changes
  useEffect(() => {
    if (roadmapInput) {
      localStorage.setItem("currentRoadmap", JSON.stringify(roadmapInput));
    }
  }, [roadmapInput]);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("roadmapDarkMode");
    if (savedDarkMode) {
      setIsDarkMode(savedDarkMode === "true");
      if (savedDarkMode === "true") {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("roadmapDarkMode", String(newDarkMode));
  };

  const {
    nodes: initialNodes,
    edges: initialEdges,
    monthPlans,
  } = useMemo(
    () => getInitialNodesAndEdges(roadmapInput, setSelectedMonthIndex),
    [roadmapInput]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      // Handle month node click
      if (node.id.startsWith("month-")) {
        const monthIndex = parseInt(node.id.split("-")[1]) - 1; // Subtract 1 to get 0-based index
        setSelectedMonthIndex(monthIndex);
        setSelectedWeekIndex(null);
        setShowTasks(false);
        setSelectedTaskWeekIndex(null);

        // Generate weekly nodes for the selected month
        const monthId = `month-${monthIndex + 1}`;
        const monthNode = nodes.find((n) => n.id === monthId);

        if (monthNode) {
          const weeklyNodes: Node[] = [];
          const weeklyEdges: Edge[] = [];

          // Get weekly breakdown for the selected month
          const weeklyBreakdown = generateWeeklyBreakdown(
            roadmapInput,
            monthPlans
          )[monthIndex];

          // Create 4 weekly nodes
          for (let i = 0; i < 4; i++) {
            const weekId = `week-${monthIndex + 1}-${i + 1}`;
            const weekData = weeklyBreakdown.weekly[i];

            weeklyNodes.push({
              id: weekId,
              type: "custom",
              data: {
                label: `Week ${i + 1}`,
                subtitle: weekData.weekTitle,
                onClick: () => setSelectedWeekIndex(i),
              },
              position: {
                x: monthNode.position.x + 300,
                y: monthNode.position.y - 120 + i * 120,
              },
            });

            weeklyEdges.push({
              id: `edge-${monthId}-${weekId}`,
              source: monthId,
              target: weekId,
              type: "smoothstep",
              style: {
                stroke: "#3B82F6",
                strokeWidth: 2,
                strokeDasharray: "5,5",
              },
              animated: true,
            });
          }

          // Update nodes and edges
          setNodes((nds) => [
            ...nds.filter((n) => !n.id.startsWith("week-")),
            ...weeklyNodes,
          ]);
          setEdges((eds) => [
            ...eds.filter((e) => !e.id.startsWith("edge-month-")),
            ...weeklyEdges,
          ]);
        }
      }
      // Handle week node click
      else if (node.id.startsWith("week-")) {
        const [_, monthIndex, weekIndex] = node.id.split("-").map(Number);
        setSelectedWeekIndex(weekIndex - 1);
        setShowTasks(false);
        setSelectedTaskWeekIndex(weekIndex - 1);
      }
    },
    [nodes, monthPlans, roadmapInput]
  );

  const selectedMonth =
    selectedMonthIndex !== null ? monthPlans[selectedMonthIndex] : null;
  const weeklyBreakdown =
    selectedMonthIndex !== null
      ? generateWeeklyBreakdown(roadmapInput, monthPlans)[selectedMonthIndex]
      : null;
  const selectedWeek =
    selectedWeekIndex !== null && weeklyBreakdown
      ? weeklyBreakdown.weekly[selectedWeekIndex]
      : null;

  // Format tasks for TaskTracker
  const formatTasksForTracker = () => {
    if (!selectedMonth || !weeklyBreakdown || selectedWeekIndex === null)
      return [];

    const selectedWeek = weeklyBreakdown.weekly[selectedWeekIndex];
    // Ensure minimum 4 tasks by duplicating and modifying existing tasks if needed
    const tasks =
      selectedWeek.tasks.length < 4
        ? [
            ...selectedWeek.tasks,
            ...Array(4 - selectedWeek.tasks.length)
              .fill(null)
              .map(
                (_, i) =>
                  `Additional task ${i + 1} for ${selectedWeek.weekTitle}`
              ),
          ]
        : selectedWeek.tasks;

    return [
      {
        month: selectedMonth.month,
        monthTitle: selectedMonth.title,
        week: selectedWeekIndex + 1,
        weekTitle: selectedWeek.weekTitle,
        weekLabel: selectedWeek.weekLabel || `Week ${selectedWeekIndex + 1}`,
        tasks: tasks.map((task, taskIndex) => ({
          id: `${selectedMonth.month}-${selectedWeekIndex + 1}-${taskIndex}`,
          title: task,
          description: selectedWeek.weekDesc,
          status: "incomplete" as const,
          estimatedTime: "2-3 hours",
        })),
      },
    ];
  };

  const memoizedNodeTypes = useMemo(() => nodeTypes, []);

  return (
    <div
      className={`w-full h-screen flex transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Main Flow Area */}
      <div className="flex-1 h-full relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={memoizedNodeTypes}
          fitView
          fitViewOptions={{
            padding: 0.15,
            minZoom: 0.4,
            maxZoom: 1.2,
          }}
          proOptions={{ hideAttribution: true }}
          className={isDarkMode ? "bg-gray-900" : "bg-gray-50"}
        >
          <MiniMap
            style={{
              backgroundColor: isDarkMode ? "#1f2937" : "white",
              border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
              borderRadius: "12px",
            }}
            maskColor={isDarkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"}
            nodeColor="#3B82F6"
          />
          <Controls
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
            showZoom={true}
            showFitView={true}
            showInteractive={false}
          />
          <Background
            gap={16}
            size={1.5}
            color={isDarkMode ? "#374151" : "#d1d5db"}
            variant="dots"
            as
            const
          />
        </ReactFlow>

        {/* Floating Header with Dark Mode Toggle */}
        <div className="absolute top-6 left-6 z-10">
          <div
            className={`backdrop-blur-xl rounded-2xl px-6 py-4 shadow-xl border ${
              isDarkMode
                ? "bg-gray-800/80 border-gray-700/50"
                : "bg-white/80 border-white/30"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1
                  className={`text-2xl font-bold mb-1 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {roadmapInput.goal}
                </h1>
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {roadmapInput.months} months • {roadmapInput.skillLevel} Level
                </p>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-xl transition-colors duration-200 ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {isDarkMode ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Detail Panel */}
      <div
        className={`w-[500px] h-full border-l flex flex-col transition-colors duration-300 ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Panel Header */}
        <div
          className={`px-6 py-6 border-b ${
            isDarkMode ? "border-gray-700" : "border-gray-100"
          }`}
        >
          <h2
            className={`text-lg font-semibold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {selectedWeek ? "Week Details" : "Learning Path Details"}
          </h2>
          <p
            className={`text-sm mt-1 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {selectedWeek
              ? "Weekly tasks and resources"
              : "Click on any month to explore the breakdown"}
          </p>
        </div>

        {/* Panel Content */}
        <div className="flex-1 overflow-y-auto">
          {selectedWeek ? (
            <div className="p-6">
              {/* Week Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">
                      {selectedWeek.week}
                    </span>
                  </div>
                  <div>
                    <h3
                      className={`text-xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {selectedWeek.weekTitle}
                    </h3>
                    <p className="text-blue-500 font-semibold text-sm">
                      {selectedWeek.weekLabel}
                    </p>
                  </div>
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {selectedWeek.weekDesc}
                </p>
              </div>

              {/* Tasks Section */}
              <div className="mb-6">
                <h4
                  className={`text-sm font-bold uppercase tracking-wider mb-3 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Tasks
                </h4>
                <div className="space-y-2">
                  {formatTasksForTracker()[0]?.tasks.map((task, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-2 p-3 rounded-lg ${
                        isDarkMode
                          ? "bg-gray-700/50 border border-gray-600"
                          : "bg-gray-50 border border-gray-100"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                          isDarkMode ? "border-blue-400" : "border-blue-300"
                        }`}
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <span
                          className={`text-sm ${
                            isDarkMode ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          {task.title}
                        </span>
                        <p
                          className={`text-xs mt-1 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Estimated time: {task.estimatedTime}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources Section */}
              <div>
                <h4
                  className={`text-sm font-bold uppercase tracking-wider mb-3 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Resources
                </h4>
                <div className="space-y-2">
                  {selectedWeek.weekResources.map((resource, i) => (
                    <a
                      key={i}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
                        isDarkMode
                          ? "bg-gray-700/50 border border-gray-600 hover:bg-gray-700"
                          : "bg-gray-50 border border-gray-100 hover:bg-gray-100"
                      }`}
                    >
                      <svg
                        className={`w-5 h-5 ${
                          isDarkMode ? "text-blue-400" : "text-blue-500"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      <span
                        className={`text-sm ${
                          isDarkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        {resource.name}
                      </span>
                    </a>
                  ))}
                </div>
                <div className="mt-4">
                  <Button
                    onClick={() => {
                      if (selectedWeekIndex === selectedTaskWeekIndex) {
                        setShowTasks(!showTasks);
                      } else {
                        setShowTasks(true);
                        setSelectedTaskWeekIndex(selectedWeekIndex);
                      }
                    }}
                    className={`w-full ${
                      isDarkMode
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    {showTasks && selectedWeekIndex === selectedTaskWeekIndex
                      ? "Hide Tasks"
                      : "Break Down into Tasks"}
                  </Button>
                  {showTasks &&
                    selectedWeek &&
                    selectedWeekIndex === selectedTaskWeekIndex && (
                      <div className="mt-4">
                        <TaskTracker
                          weeklyTasks={formatTasksForTracker()}
                          showDashboard={false}
                        />
                      </div>
                    )}
                </div>
              </div>
            </div>
          ) : selectedMonth ? (
            <div className="p-6">
              {/* Month Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">
                      {selectedMonth.month}
                    </span>
                  </div>
                  <div>
                    <h3
                      className={`text-xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Month {selectedMonth.month}
                    </h3>
                    <p className="text-blue-500 font-semibold text-sm">
                      {selectedMonth.title}
                    </p>
                  </div>
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {selectedMonth.focus}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <svg
                    className={`w-8 h-8 ${
                      isDarkMode ? "text-gray-400" : "text-gray-400"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Select a Month
                </h3>
                <p
                  className={`text-sm leading-relaxed max-w-xs ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Click on any month in the learning path to view its detailed
                  breakdown and weekly tasks.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
