import { Suspense } from "react";
import { PageHeader } from "@/components/page-header";
import { ReminderListLoader } from "@/components/reminders/reminder-list-loader";
import { ReminderListSkeleton } from "@/components/reminders/reminder-list-skeleton";

export default function RemindersPage() {
  return (
    <>
      <PageHeader title="Reminders" />
      <Suspense fallback={<ReminderListSkeleton />}>
        <ReminderListLoader />
      </Suspense>
    </>
  );
}
