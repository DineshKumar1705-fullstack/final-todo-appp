"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function FeedbackPage() {
  const [form, setForm] = useState({ name: "", feedback: "" });
  const [entries, setEntries] = useState<{ name: string; feedback: string }[]>([]);

  
  useEffect(() => {
    const saved = localStorage.getItem("feedbacks");
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  
  useEffect(() => {
    localStorage.setItem("feedbacks", JSON.stringify(entries));
  }, [entries]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit and save locally
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry = {
      name: form.name.trim(),
      feedback: form.feedback.trim(),
    };

    if (!newEntry.name || !newEntry.feedback) return;

    setEntries((prev) => [...prev, newEntry]);
    setForm({ name: "", feedback: "" });
  };

  return (
    <main className="p-8 max-w-xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg mt-5 text-black bg-black">
      <h1 className="text-3xl font-bold text-center text-cyan-700 mb-6">
        Feedback Form
      </h1>

      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border rounded p-2 text-black placeholder-gray-500"
        />
        <textarea
          name="feedback"
          placeholder="Your Feedback"
          value={form.feedback}
          onChange={handleChange}
          required
          className="border rounded p-2 text-black placeholder-gray-500"
        ></textarea>
        <button
          type="submit"
          className="bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700 transition"
        >
          Submit Feedback
        </button>
      </form>

      <Link href="/articles">
        <button className="bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700 flex mb-4 justify-center w-full">
          🏠 Back to News Page
        </button>
      </Link>

      
      <h2 className="text-xl font-semibold mb-3">All Feedbacks</h2>
      {entries.length === 0 ? (
        <p className="text-gray-500">No feedback submitted yet.</p>
      ) : (
        <ul className="space-y-3">
          {entries.map((f, index) => (
            <li
              key={index}
              className="border rounded p-3 bg-gray-50 shadow-sm text-black"
            >
              <p className="font-semibold text-cyan-700">{f.name}</p>
              <p className="text-gray-800">{f.feedback}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
