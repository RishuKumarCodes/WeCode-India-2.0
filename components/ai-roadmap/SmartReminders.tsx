
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Calendar,
  Target,
  Zap
} from "lucide-react";
import { SmartReminders as SmartRemindersType } from "@/types/reminderTypes";

interface SmartRemindersProps {
  reminders: SmartRemindersType;
  onTaskAction?: (action: 'start' | 'view' | 'update') => void;
}

export default function SmartReminders({ reminders, onTaskAction }: SmartRemindersProps) {
  const { today, missedTasks, notifications, weeklyGoal } = reminders;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily': return <Calendar className="w-4 h-4" />;
      case 'missed': return <AlertCircle className="w-4 h-4" />;
      case 'encouragement': return <CheckCircle2 className="w-4 h-4" />;
      case 'milestone': return <Target className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Today's Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            Today's Focus
          </CardTitle>
        </CardHeader>
        <CardContent>
          {today.tasks.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Recommended for {today.date}
                </span>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {today.estimatedTime}
                </Badge>
              </div>
              <div className="space-y-2">
                {today.tasks.map((task, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded-md">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">{task}</span>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => onTaskAction?.('start')} 
                className="w-full"
                size="sm"
              >
                Start Now
              </Button>
            </div>
          ) : (
            <div className="text-center py-4">
              <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No tasks scheduled for today. Great job staying on track!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Missed Tasks Recovery */}
      {missedTasks.count > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <AlertCircle className="w-5 h-5" />
              Catch-Up Needed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-orange-700">
                  {missedTasks.count} pending task{missedTasks.count > 1 ? 's' : ''}
                </span>
                <Badge variant="destructive">
                  {missedTasks.daysOverdue} day{missedTasks.daysOverdue > 1 ? 's' : ''} behind
                </Badge>
              </div>
              
              <div className="bg-white p-3 rounded-md border border-orange-200">
                <p className="text-sm text-orange-600 font-medium mb-2">Recovery Plan:</p>
                <p className="text-sm text-gray-700">{missedTasks.recoveryPlan}</p>
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => onTaskAction?.('view')} 
                className="w-full border-orange-300 text-orange-700 hover:bg-orange-100"
                size="sm"
              >
                View Missed Tasks
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Goal Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            This Week's Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Tasks Completed</span>
              <span className="font-bold">
                {weeklyGoal.completedTasks}/{weeklyGoal.targetTasks}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all"
                style={{ 
                  width: `${Math.min((weeklyGoal.completedTasks / weeklyGoal.targetTasks) * 100, 100)}%` 
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {weeklyGoal.remainingDays} day{weeklyGoal.remainingDays !== 1 ? 's' : ''} left in this week
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-600" />
            Smart Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className="flex items-start gap-3 p-3 rounded-md border hover:bg-gray-50 transition-colors"
              >
                <div className="mt-0.5">
                  {getTypeIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{notification.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                    <Badge 
                      variant={getPriorityColor(notification.priority)}
                      className="text-xs"
                    >
                      {notification.priority}
                    </Badge>
                  </div>
                </div>
                {notification.cta && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onTaskAction?.('update')}
                    className="text-xs"
                  >
                    {notification.cta}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
