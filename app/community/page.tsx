import { redirect } from "next/navigation";

export default function CommunityIndex() {
  redirect("/community/feed");
}