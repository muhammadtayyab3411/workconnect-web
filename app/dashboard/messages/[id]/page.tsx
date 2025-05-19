import { redirect } from "next/navigation";

export default function ConversationPage() {
  // In a real app, you would fetch the conversation based on the ID
  // For now, just redirect to the messages page which shows the first conversation
  redirect("/dashboard/messages");
} 