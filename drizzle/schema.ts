import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  integer,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  authUserId: uuid("auth_user_id").unique(),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 256 }),
  isAdmin: boolean("is_admin").notNull().default(false),
});

export const cars = pgTable("cars", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  make: varchar("make", { length: 100 }).notNull(),
  model: varchar("model", { length: 100 }).notNull(),
  year: integer("year").notNull(),
  licensePlate: varchar("license_plate", { length: 20 }),
});

export const maintenanceRecords = pgTable("maintenance_records", {
  id: serial("id").primaryKey(),
  carId: integer("car_id")
    .notNull()
    .references(() => cars.id, { onDelete: "cascade" }),
  serviceDate: timestamp("service_date").notNull(),
  description: text("description").notNull(),
  mileage: integer("mileage"),
  cost: integer("cost"),
});
