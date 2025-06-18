import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getPredefinedResponse = (message: string) => {
  const input = message.toLowerCase();

  // Handle behavioral and personal queries
  if (
    input.includes("stress") ||
    input.includes("anxiety") ||
    input.includes("overwhelm")
  ) {
    return "I understand that feeling overwhelmed is common in software development. Here are some practical steps to manage stress:\n\n1. Break down tasks into smaller, manageable chunks\n2. Take regular breaks using the Pomodoro technique\n3. Practice mindfulness or meditation\n4. Maintain a healthy work-life balance\n\nWould you like to talk more about any of these strategies?";
  }

  if (
    input.includes("motivation") ||
    input.includes("unmotivated") ||
    input.includes("stuck")
  ) {
    return "It's completely normal to feel unmotivated sometimes. Here's what might help:\n\n1. Set small, achievable goals for each day\n2. Celebrate your progress, no matter how small\n3. Connect with other developers in our community\n4. Take a short break and come back refreshed\n\nWhat specific aspect of your learning journey are you finding challenging?";
  }

  if (
    input.includes("imposter") ||
    input.includes("not good enough") ||
    input.includes("doubt")
  ) {
    return "Imposter syndrome is very common in tech. Remember:\n\n1. Everyone starts somewhere - even senior developers were beginners once\n2. Focus on your progress, not perfection\n3. Share your journey with others - you're not alone\n4. Keep a log of your achievements\n\nWould you like to discuss specific ways to build confidence in your skills?";
  }

  if (
    input.includes("balance") ||
    input.includes("time management") ||
    input.includes("schedule")
  ) {
    return "Balancing learning with other responsibilities can be challenging. Here's a suggested approach:\n\n1. Create a realistic schedule that includes breaks\n2. Set specific learning goals for each week\n3. Use time-blocking techniques\n4. Don't forget to include time for rest and recreation\n\nWould you like help creating a personalized schedule?";
  }

  if (
    input.includes("community") ||
    input.includes("connect") ||
    input.includes("network")
  ) {
    return "Building connections in the tech community is valuable. Here are some ways to get started:\n\n1. Join our Discord community\n2. Participate in code reviews\n3. Share your projects and get feedback\n4. Attend virtual meetups and workshops\n\nWould you like information about specific community events or activities?";
  }

  // Handle technical queries with the existing responses
  if (
    input.includes("dsa") ||
    input.includes("data structure") ||
    input.includes("algorithm")
  ) {
    return "Based on your progress, I recommend focusing on arrays and strings first, then moving on to linked lists. Here are some resources I suggest:\n\n1. Complete the Arrays & Strings section in the DSA module\n2. Practice 3-5 easy problems on arrays from the problem set\n3. Watch the video tutorial on time complexity analysis\n\nWould you like me to suggest specific problems to solve?";
  } else if (input.includes("project") || input.includes("portfolio")) {
    return "For your skill level, I recommend starting with these projects:\n\n1. Todo List App - Great for practicing CRUD operations and state management\n2. Weather Dashboard - Good for learning API integration\n3. Portfolio Website - Essential for showcasing your work\n\nEach of these projects has step-by-step guides in the Projects section. Would you like more details on any of these?";
  } else if (input.includes("interview") || input.includes("job")) {
    return "To prepare for technical interviews, I recommend:\n\n1. Complete at least 100 DSA problems across different categories\n2. Build 3-5 projects that demonstrate your technical skills\n3. Practice explaining your code and thought process\n4. Review system design basics\n\nYou can access mock interview questions in the Interview Prep section. Would you like to see a roadmap tailored for interview preparation?";
  } else if (input.includes("roadmap") || input.includes("learn")) {
    return "Based on your profile, here's a personalized learning roadmap:\n\n1. Complete the DSA fundamentals (Arrays, Linked Lists, Stacks/Queues)\n2. Build two beginner web projects to apply your knowledge\n3. Learn React.js fundamentals\n4. Build a full-stack application with React and Node.js\n5. Start exploring system design concepts\n\nThis should take approximately 3-4 months with consistent practice. Would you like me to break this down into weekly goals?";
  }

  return null;
};

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    // Check for predefined responses first
    const predefinedResponse = getPredefinedResponse(lastMessage);
    if (predefinedResponse) {
      return NextResponse.json({
        message: predefinedResponse,
      });
    }

    // If no predefined response, use OpenAI with a more empathetic system prompt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a supportive and empathetic AI assistant for We Code India. Your role is to:
1. Provide emotional support and practical advice for learning challenges
2. Help users manage stress, motivation, and work-life balance
3. Address imposter syndrome and confidence issues
4. Guide users in building a supportive community
5. Offer technical guidance when needed
Always be:
- Empathetic and understanding
- Practical and actionable
- Encouraging and positive
- Clear and concise
- Professional yet friendly`,
        },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({
      message: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
}
