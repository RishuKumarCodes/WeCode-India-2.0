
import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "project-progress";

// Progress: { [projectId: string]: { completedSteps: string[], lastVisited: string } }
export function useLocalProjectProgress(projectId: string) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [lastVisited, setLastVisited] = useState<string | null>(null);

  // On mount, load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.[projectId]) {
        setCompletedSteps(parsed[projectId].completedSteps || []);
        setLastVisited(parsed[projectId].lastVisited || null);
      }
    }
  }, [projectId]);

  // Save when completedSteps changes
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    let parsed = stored ? JSON.parse(stored) : {};
    parsed[projectId] = {
      completedSteps,
      lastVisited: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  }, [projectId, completedSteps]);

  const toggleStep = useCallback(
    (stepId: string) => {
      setCompletedSteps((prev) =>
        prev.includes(stepId)
          ? prev.filter((id) => id !== stepId)
          : [...prev, stepId]
      );
    },
    []
  );

  return {
    completedSteps,
    toggleStep,
    lastVisited,
  };
}
