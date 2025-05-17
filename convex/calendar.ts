import { query, mutation } from "../convex/_generated/server";
import { v } from "convex/values";

// Define the shape of our calendar tag
export const calendarTag = {
  date: v.string(),
  color: v.string(),
};

// Get all tags
export const getTags = query({
  args: {},
  handler: async (ctx) => {
    const tags = await ctx.db.query("calendarTags").collect();
    // Convert to a record for easier lookup
    return tags.reduce((acc: Record<string, string>, { _id, ...tag }: any) => ({
      ...acc,
      [tag.date]: tag.color,
    }), {});
  },
});

// Toggle a tag for a specific date
export const toggleTag = mutation({
  args: {
    date: v.string(),
    color: v.string(),
  },
  handler: async (ctx: any, args: { date: string; color: string }) => {
    // Check if tag already exists for this date
    const existingTag = await ctx.db
      .query("calendarTags")
      .withIndex("by_date", (q: any) => q.eq("date", args.date))
      .first();

    if (existingTag) {
      // If tag exists with the same color, remove it
      if (existingTag.color === args.color) {
        await ctx.db.delete(existingTag._id);
      } else {
        // Otherwise, update the color
        await ctx.db.patch(existingTag._id, { color: args.color });
      }
    } else {
      // If no tag exists, create a new one
      await ctx.db.insert("calendarTags", {
        date: args.date,
        color: args.color,
      });
    }
  },
});
