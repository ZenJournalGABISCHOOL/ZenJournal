import React from "react";
import { useForm } from "react-hook-form";
import { journalSchema } from "../store/schemas/journalSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { addEntry } from "../store/slices/JournalSlice";

export default function JournalForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      text: "",
      mood: "",
      tags: ""
    }
  });
  const onSubmit = async (data) => {
    // Handle form submission
    console.log("🎉 onSubmit called! Form passed validation!");
    try {
      console.log("Form data before dispatch:", data);
      console.log("data.tags type:", typeof data.tags, "value:", data.tags);
      
      // Process tags: handle different data types
      let tagsArray = [];
      if (data.tags) {
        if (typeof data.tags === 'string') {
          // If it's a string, split by commas
          tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        } else if (Array.isArray(data.tags)) {
          // If it's already an array, use it as is
          tagsArray = data.tags.filter(tag => tag && tag.length > 0);
        } else {
          console.warn("Unexpected tags type:", typeof data.tags, data.tags);
        }
      }
      
      const entryData = {
        text: data.text,
        mood: data.mood,
        tags: tagsArray
      };
      
      console.log("Processed entry data:", entryData);
      await dispatch(addEntry(entryData)).unwrap();
      reset();
      alert('Journal entry added successfully!');
    } catch (error) {
      console.error('Failed to add entry:', error);
      alert('Failed to add journal entry. Please try again.');
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-2xl mx-auto border-2 border-gray-300 rounded p-4 mb-6">
      <textarea
        className="bg-gray-50 p-3 mb-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-vertical"
        placeholder="Write your thoughts here..."
        {...register("text")}
      />
      {errors.text && <p className="text-red-500 mb-3">{errors.text.message}</p>}
      <select
        className="bg-gray-50 p-3 mb-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...register("mood")}
      >
        <option value="">Select your mood...</option>
        <option value="very low">� Very Low</option>
        <option value="low">😐 Low</option>
        <option value="neutral">� Neutral</option>
        <option value="high">😊 High</option>
        <option value="very high">� Very High</option>
      </select>
      {errors.mood && <p className="text-red-500 mb-3">{errors.mood.message}</p>}
      
      <input
        type="text"
        className="bg-gray-50 p-3 mb-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Tags (optional, comma-separated)"
        {...register("tags")}
      />
      
      <button type="submit" className="button">Submit</button>
      
      {/* Debug button to test form validation */}
      <button 
        type="button" 
        onClick={() => console.log("Current form errors:", errors)}
        className="mt-2 px-4 py-2 bg-gray-500 text-white rounded text-sm"
      >
        Debug: Check Form Errors
      </button>
    </form>
  );
}
