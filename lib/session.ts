// Placeholder for Supabase Auth (see _notes/4_auth.md). Replace with a real
// session lookup once auth is wired up.
export type CurrentUser = {
  id: number;
  fullName: string;
  isAdmin: boolean;
};

const MOCK_USER: CurrentUser = {
  id: 1,
  fullName: "Demo User",
  isAdmin: true,
};

export function getCurrentUser(): CurrentUser {
  return MOCK_USER;
}
