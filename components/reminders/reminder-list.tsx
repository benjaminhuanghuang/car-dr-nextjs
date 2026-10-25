import { requireUser } from "@/lib/session";
import { getReminders } from "@/lib/reminders";
import { ReminderItem } from "@/components/reminders/reminder-item";
import { ReminderListEmptyState } from "@/components/reminders/reminder-list-empty-state";

export async function ReminderList() {
  const user = await requireUser();
  const reminders = await getReminders(user.id);

  if (reminders.length === 0) {
    return <ReminderListEmptyState />;
  }

  return (
    <ul className="flex flex-col gap-3">
      {reminders.map((reminder) => (
        <li key={`${reminder.car.id}-${reminder.suggestion.service}`}>
          <ReminderItem reminder={reminder} />
        </li>
      ))}
    </ul>
  );
}
