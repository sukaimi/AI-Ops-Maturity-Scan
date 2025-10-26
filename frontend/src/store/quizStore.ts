import { create } from 'zustand'

export interface Answer {
  questionId: string
  value: number
}

interface QuizState {
  currentQuestionIndex: number
  answers: Record<string, number>
  scores: {
    aiReadinessScore: number
    automationGapPercent: number
    roiPotentialPercent: number
    dealPriority: number
    decisionPower: number
    timeline: number
    costOfPain: number
  } | null
  userInfo: {
    fullName: string
    email: string
  } | null
  reportSections: any | null
  leadId: string | null
  setAnswer: (questionId: string, value: number) => void
  setScores: (scores: QuizState['scores']) => void
  setUserInfo: (info: QuizState['userInfo']) => void
  setReportSections: (report: any) => void
  setLeadId: (id: string) => void
  nextQuestion: () => void
  prevQuestion: () => void
  reset: () => void
}

const TOTAL_QUESTIONS = 18

export const useQuizStore = create<QuizState>((set) => ({
  currentQuestionIndex: 0,
  answers: {},
  scores: null,
  userInfo: null,
  reportSections: null,
  leadId: null,

  setAnswer: (questionId, value) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: value }
    })),

  setScores: (scores) => set({ scores }),

  setUserInfo: (info) => set({ userInfo: info }),

  setReportSections: (report) => set({ reportSections: report }),

  setLeadId: (id) => set({ leadId: id }),

  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, TOTAL_QUESTIONS - 1)
    })),

  prevQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0)
    })),

  reset: () =>
    set({
      currentQuestionIndex: 0,
      answers: {},
      scores: null,
      userInfo: null,
      reportSections: null,
      leadId: null
    })
}))

