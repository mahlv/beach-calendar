import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  calendarTags: defineTable({
    date: v.string(),
    color: v.string(),
  })
  .index("by_date", ["date"])
});
