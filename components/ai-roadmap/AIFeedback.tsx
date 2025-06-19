
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  Clock,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { AIFeedback as AIFeedbackType } from "@/types/feedbackTypes";

interface AIFeedbackProps {
  feedback: AIFeedbackType;
}

export default function AIFeedback({ feedback }: AIFeedbackProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Brain className="w-5 h-5" />
            AI Learning Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-700 font-medium">{feedback.summary}</p>
          {feedback.estimatedTimeToNextMilestone && (
            <div className="flex items-center gap-2 mt-2 text-sm text-purple-600">
              <Clock className="w-4 h-4" />
              {feedback.estimatedTimeToNextMilestone}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-800 text-lg">
              <CheckCircle2 className="w-5 h-5" />
              What You're Doing Well
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {feedback.strengths.map((strength, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span className="text-green-700 text-sm">{strength}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Improvement Suggestions */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-orange-800 text-lg">
              <TrendingUp className="w-5 h-5" />
              Areas for Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {feedback.improvementSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-orange-700 text-sm">{suggestion}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Focus */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Target className="w-5 h-5" />
            Your Next Focus
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-700">{feedback.nextFocus}</p>
        </CardContent>
      </Card>

      {/* Motivational Tip */}
      {feedback.motivationalTip && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <Lightbulb className="w-5 h-5" />
              Learning Tip
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-700 italic">"{feedback.motivationalTip}"</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
