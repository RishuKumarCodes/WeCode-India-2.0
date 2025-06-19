
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Clock, 
  Target, 
  Flame, 
  Calendar,
  TrendingUp,
  CheckCircle2,
  Star
} from "lucide-react";
import { DashboardAnalytics } from "@/types/dashboardTypes";

interface UserDashboardProps {
  analytics: DashboardAnalytics;
  userName?: string;
}

export default function UserDashboard({ analytics, userName }: UserDashboardProps) {
  const {
    completionPercent,
    tasksCompleted,
    totalTasks,
    monthWiseProgress,
    streakDays,
    hoursRemainingEstimate,
    motivationalMessage,
    currentLevel,
    tasksCompletedToday,
    averageTasksPerDay,
    estimatedCompletionDate
  } = analytics;

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">
          {userName ? `${userName}'s` : "Your"} Learning Dashboard
        </h2>
        <p className="text-gray-600">{motivationalMessage}</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Progress */}
        <Card className="bg-gradient-to-br from-green-100 to-green-200 border-green-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-green-600" />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-green-700">
                {completionPercent}%
              </div>
              <Progress value={completionPercent} className="h-2" />
              <p className="text-xs text-green-600">
                {tasksCompleted} of {totalTasks} tasks completed
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Current Streak */}
        <Card className="bg-gradient-to-br from-orange-100 to-red-200 border-orange-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-600" />
              Current Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-orange-700">
                {streakDays} days
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-600" />
                <span className="text-xs text-orange-600">
                  {tasksCompletedToday} tasks today
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Remaining */}
        <Card className="bg-gradient-to-br from-blue-100 to-purple-200 border-blue-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Time Remaining
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-blue-700">
                {hoursRemainingEstimate}h
              </div>
              <p className="text-xs text-blue-600">
                ~{averageTasksPerDay} tasks/day avg
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Current Level */}
        <Card className="bg-gradient-to-br from-purple-100 to-pink-200 border-purple-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Trophy className="w-4 h-4 text-purple-600" />
              Current Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-purple-700">
                Level {currentLevel}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(Math.min(currentLevel, 5))].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                ))}
                {currentLevel > 5 && (
                  <span className="text-xs text-purple-600 ml-1">
                    +{currentLevel - 5} more
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Monthly Progress Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(monthWiseProgress).map(([month, progress]) => (
              <div key={month} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{month}</span>
                  <Badge variant={progress >= 75 ? "default" : progress >= 50 ? "secondary" : "outline"}>
                    {progress}%
                  </Badge>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Completion Estimate */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Completion Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <p className="text-gray-600">
              At your current pace, you're estimated to complete your roadmap by:
            </p>
            <div className="text-xl font-bold text-green-700">
              {estimatedCompletionDate}
            </div>
            {averageTasksPerDay > 0 && (
              <p className="text-sm text-gray-500">
                Based on your average of {averageTasksPerDay} tasks per day
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
