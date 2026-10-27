import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("next/server", () => ({ connection: vi.fn() }));
vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  }),
}));

const mockGetUser = vi.fn();
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({ auth: { getUser: mockGetUser } })),
}));

vi.mock("@/lib/db", () => ({ db: { select: vi.fn() } }));

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { requireAdmin, requireUser } from "@/lib/session";

const mockSelect = vi.mocked(db.select);
const mockRedirect = vi.mocked(redirect);

function profileQuery(profile: unknown) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const builder: any = {};
  builder.from = vi.fn(() => builder);
  builder.where = vi.fn(() => builder);
  builder.then = (
    resolve: (value: unknown) => unknown,
    reject: (reason: unknown) => unknown,
  ) => Promise.resolve(profile ? [profile] : []).then(resolve, reject);
  return builder;
}

beforeEach(() => {
  mockSelect.mockReset();
  mockGetUser.mockReset();
  mockRedirect.mockClear();
});

describe("authorization gates", () => {
  it("rejects a signed-out caller from requireUser", async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });

    await expect(requireUser()).rejects.toThrow("NEXT_REDIRECT:/signin");
    expect(mockRedirect).toHaveBeenCalledWith("/signin");
  });

  it("rejects a non-admin user calling an admin-only function", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "auth-uuid-1" } },
    });
    mockSelect.mockReturnValue(
      profileQuery({ id: 1, fullName: "Regular User", isAdmin: false }),
    );

    await expect(requireAdmin()).rejects.toThrow("NEXT_REDIRECT:/");
    expect(mockRedirect).toHaveBeenCalledWith("/");
  });

  it("allows an admin user through requireAdmin", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "auth-uuid-2" } },
    });
    mockSelect.mockReturnValue(
      profileQuery({ id: 2, fullName: "Admin User", isAdmin: true }),
    );

    const user = await requireAdmin();

    expect(user).toEqual({ id: 2, fullName: "Admin User", isAdmin: true });
    expect(mockRedirect).not.toHaveBeenCalled();
  });
});
