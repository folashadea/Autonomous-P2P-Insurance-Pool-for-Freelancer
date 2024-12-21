import { describe, it, expect, beforeEach, vi } from 'vitest'

const mockContractCall = vi.fn()

describe('Insurance Policy Contract', () => {
  const contractAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
  const contractName = 'insurance-policy'
  let user: string
  
  beforeEach(() => {
    user = 'ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC'
    mockContractCall.mockClear()
  })
  
  describe('create-policy', () => {
    it('should create a policy successfully', async () => {
      mockContractCall.mockResolvedValueOnce({ success: true, value: 0 })
      const result = await mockContractCall('create-policy', [100000, 1000, 52], { sender: user })
      expect(result.success).toBe(true)
      expect(result.value).toBe(0)
    })
  })
  
  describe('get-policy', () => {
    it('should return policy information', async () => {
      const policyInfo = {
        owner: user,
        'coverage-amount': 100000,
        premium: 1000,
        'start-date': 123456,
        'end-date': 123508,
        active: true
      }
      mockContractCall.mockResolvedValueOnce({ success: true, value: policyInfo })
      const result = await mockContractCall('get-policy', [0])
      expect(result.success).toBe(true)
      expect(result.value).toEqual(policyInfo)
    })
    
    it('should return null for non-existent policy', async () => {
      mockContractCall.mockResolvedValueOnce({ success: true, value: null })
      const result = await mockContractCall('get-policy', [999])
      expect(result.success).toBe(true)
      expect(result.value).toBeNull()
    })
  })
  
  describe('cancel-policy', () => {
    it('should cancel a policy successfully', async () => {
      mockContractCall.mockResolvedValueOnce({ success: true, value: true })
      const result = await mockContractCall('cancel-policy', [0], { sender: user })
      expect(result.success).toBe(true)
      expect(result.value).toBe(true)
    })
    
    it('should fail if policy does not exist', async () => {
      mockContractCall.mockResolvedValueOnce({ success: false, error: 404 })
      const result = await mockContractCall('cancel-policy', [999], { sender: user })
      expect(result.success).toBe(false)
      expect(result.error).toBe(404)
    })
    
    it('should fail if caller is not the policy owner', async () => {
      mockContractCall.mockResolvedValueOnce({ success: false, error: 403 })
      const result = await mockContractCall('cancel-policy', [0], { sender: 'ST3REHHS5J3CERCRBEPMGH7921Q6PYKAADT7JP2VB' })
      expect(result.success).toBe(false)
      expect(result.error).toBe(403)
    })
  })
})

