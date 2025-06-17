import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { events } from "../../constants/events";
import { groups } from "../../constants/groups";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link } from "lucide-react";

function RightPannel() {
  return (
    <div className="space-y-6 hidden md:block">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Join live sessions and workshops</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="space-y-2">
              <div className="font-medium">{event.title}</div>
              <div className="text-sm text-muted-foreground">
                {event.description}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>{event.date}</span>
                <span>{event.attendees} attending</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, i) => (
                  <Badge key={i} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>
              <Separator className="my-2" />
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="outline" asChild>
            <Link href="/community/events">View All Events</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Study Groups</CardTitle>
          <CardDescription>Learn together with others</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {groups.map((group) => (
            <div key={group.id} className="space-y-2">
              <div className="font-medium">{group.name}</div>
              <div className="text-sm text-muted-foreground">
                {group.description}
              </div>
              <div className="text-sm">{group.members} members</div>
              <Separator className="my-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default RightPannel;
