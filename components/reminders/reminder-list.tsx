import { requireUser } from "@/lib/session";
import { getReminders } from "@/lib/reminders";
import { ReminderListEmptyState } from "@/components/reminders/reminder-list-empty-state";
import { ReminderListView } from "@/components/reminders/reminder-list-view";

export async function ReminderList() {
  const user = await requireUser();
  const reminders = await getReminders(user.id);

  if (reminders.length === 0) {
    return <ReminderListEmptyState />;
  }

  return <ReminderListView reminders={reminders} />;
}
