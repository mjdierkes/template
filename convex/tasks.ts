import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all tasks, sorted by creation time
export const get = query({
  handler: async (ctx) => {
    return await ctx.db.query("tasks").order("desc").collect();
  },
});

// Add a new task
export const add = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("tasks", {
      text: args.text,
      completed: false,
      createdAt: Date.now(),
    });
    return taskId;
  },
});

// Toggle the completed state of a task
export const toggle = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id);
    if (!task) {
      throw new Error("Task not found");
    }
    await ctx.db.patch(args.id, {
      completed: !task.completed,
    });
  },
});

// Delete a task
export const remove = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
}); 