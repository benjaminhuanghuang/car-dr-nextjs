import { Suspense } from "react";
import { PageHeader } from "@/components/page-header";
import { ReminderList } from "@/components/reminders/reminder-list";
import { ReminderListSkeleton } from "@/components/reminders/reminder-list-skeleton";

export default function RemindersPage() {
  return (
    <>
      <PageHeader title="Reminders" />
      <Suspense fallback={<ReminderListSkeleton />}>
        <ReminderList />
      </Suspense>
    </>
  );
}
