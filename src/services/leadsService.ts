import { api, isMockMode } from './api'

export interface CreateLeadPayload {
  schoolName: string
  contactName: string
  email: string
  phoneNumber: string
  address?: string
  studentCount?: number | string
  notes?: string
}

export interface LeadResponse {
  id?: string | number
  status: string
  message?: string
}

export const leadsService = {
  /**
   * Endpoint: POST /leads (Pengajuan Sekolah / Kontak Mitra)
   */
  async createLead(payload: CreateLeadPayload): Promise<LeadResponse> {
    if (isMockMode()) {
      return {
        id: 'mock-lead-' + Date.now(),
        status: 'success',
        message: 'Pengajuan sekolah berhasil disimpan secara lokal (Mock Mode)'
      }
    }
    return api.post<LeadResponse>('leads', payload)
  },

  /**
   * Endpoint: GET /leads
   */
  async getLeads(): Promise<LeadResponse[]> {
    if (isMockMode()) {
      return []
    }
    return api.get<LeadResponse[]>('leads')
  },
}
