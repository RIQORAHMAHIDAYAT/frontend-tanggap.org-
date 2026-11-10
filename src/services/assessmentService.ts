import { api, isMockMode } from './api'

export interface AssessmentAnswerPayload {
  answers: Record<string | number, string | number>
  userId?: string | number
  schoolCode?: string
}

export interface AssessmentResultResponse {
  score?: number
  category?: string
  dominantStyle?: string
  description?: string
  details?: unknown
  message?: string
}

export const assessmentService = {
  /**
   * Endpoint: GET /assessments
   */
  async getAssessments(): Promise<unknown> {
    if (isMockMode()) {
      return []
    }
    return api.get('assessments')
  },

  /**
   * Endpoint: POST /assessments/submit
   */
  async submitAssessment(payload: AssessmentAnswerPayload): Promise<AssessmentResultResponse> {
    if (isMockMode()) {
      return {
        score: 80,
        category: 'Optimal',
        dominantStyle: 'Melankolis - Koleris',
        message: 'Assessment berhasil diproses secara lokal (Mock Mode)'
      }
    }
    return api.post<AssessmentResultResponse>('assessments/submit', payload)
  },

  /**
   * Endpoint: GET /assessments/results/:id
   */
  async getResultById(id: string | number): Promise<AssessmentResultResponse> {
    if (isMockMode()) {
      return {
        score: 80,
        dominantStyle: 'Melankolis - Koleris'
      }
    }
    return api.get<AssessmentResultResponse>(`assessments/results/${id}`)
  },
}
