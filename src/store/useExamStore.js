// store/useExamStore.js - Add this sample exam for testing
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useExamStore = create(
  persist(
    (set) => ({
      exams: [
        {
          id: 123456,
          title: "Psychometric Test for Management Trainee Officer",
          candidates: "10,000",
          sets: 3,
          slots: 3,
          questionSets: 3,
          duration: 30,
          startTime: "2025-01-01T09:00",
          endTime: "2025-12-31T18:00",
          questions: [
            {
              id: 1,
              title: "Which of the following indicators is used to measure market volatility?",
              type: "radio",
              options: [
                "Relative Strength Index (RSI)",
                "Moving Average Convergence Divergence (MACD)",
                "Bollinger Bands",
                "Fibonacci Retracement"
              ],
              correctAnswer: "Bollinger Bands"
            },
            {
              id: 2,
              title: "What is the primary purpose of a balance sheet?",
              type: "radio",
              options: [
                "Show company's profits",
                "Show company's financial position",
                "Show cash flow",
                "Show market share"
              ],
              correctAnswer: "Show company's financial position"
            },
            {
              id: 3,
              title: "Explain the concept of market efficiency in your own words.",
              type: "text",
              options: [],
              correctAnswer: ""
            }
          ]
        }
      ],
      addExam: (exam) =>
        set((state) => ({
          exams: [...state.exams, exam],
        })),
      updateExam: (id, updatedExam) =>
        set((state) => ({
          exams: state.exams.map((exam) =>
            exam.id === id ? { ...exam, ...updatedExam } : exam
          ),
        })),
      deleteExam: (id) =>
        set((state) => ({
          exams: state.exams.filter((exam) => exam.id !== id),
        })),
    }),
    {
      name: 'exam-storage',
    }
  )
);