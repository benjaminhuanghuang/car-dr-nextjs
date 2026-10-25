import Link from "next/link";
import { Bell } from "lucide-react";
import { getReminders } from "@/lib/reminders";
import { cn } from "@/lib/utils";

/** Nav bell linking to `/reminders`, badged with the count of due-soon/overdue items. */
export async function ReminderBell({ userId }: { userId: number }) {
  const reminders = await getReminders(userId, new Date());
  const overdueCount = reminders.filter((r) => r.overdue).length;

  return (
    <Link
      href="/reminders"
      aria-label={
        reminders.length > 0
          ? `Reminders: ${reminders.length} upcoming`
          : "Reminders"
      }
      className="inline-flex size-8 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-accent"
    >
      <span className="relative inline-flex">
        <Bell className="size-4.5" aria-hidden />
        {reminders.length > 0 && (
          <span
            aria-hidden
            className={cn(
              "absolute -top-1.5 -right-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full px-0.5 text-[9px] font-semibold tabular-nums",
              overdueCount > 0
                ? "bg-destructive text-destructive-foreground"
                : "bg-warning text-warning-foreground"
            )}
          >
            {reminders.length > 9 ? "9+" : reminders.length}
          </span>
        )}
      </span>
    </Link>
  );
}
