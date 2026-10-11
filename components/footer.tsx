import Image from "next/image";
import { cacheLife } from "next/cache";

async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await getCurrentYear();

  return (
    <footer className="border-t border-zinc-200 px-6 py-8 text-sm text-muted-foreground dark:border-zinc-800">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <Image src="/gear-car-black.svg" alt="" width={20} height={20} />
          <span className="font-semibold text-foreground">Car Doctor</span>
        </div>
        <p>&copy; {year} Car Doctor. All rights reserved.</p>
        {/* Filled in at release time by scripts/update_commit_hash.sh */}
        <span className="text-sm text-muted-foreground" id="commit-hash">962c083</span>
      </div>
    </footer>
  );
}
