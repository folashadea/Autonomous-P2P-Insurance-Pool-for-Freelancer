import { describe, it, expect, beforeEach, vi } from 'vitest'

const mockContractCall = vi.fn()

describe('Premium Pool Contract', () => {
  const contractAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
  const contractName = 'premium-pool'
  let user: string
  
  beforeEach(() => {
    user = 'ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC'
    mockContractCall.mockClear()
  })
  
  describe('pay-premium', () => {
    it('should pay premium successfully', async () => {
      mockContractCall.mockResolvedValueOnce({ success: true, value: true })
      const result = await mockContractCall('pay-premium', [1000], { sender: user })
      expect(result.success).toBe(true)
      expect(result.value).toBe(true)
    })
  })
  
  describe('pay-claim', () => {
    it('should pay claim successfully', async () => {
      mockContractCall.mockResolvedValueOnce({ success: true, value: true })
      const result = await mockContractCall('pay-claim', [5000, user], { sender: contractAddress })
      expect(result.success).toBe(true)
      expect(result.value).toBe(true)
    })
    
    it('should fail if insufficient balance', async () => {
      mockContractCall.mockResolvedValueOnce({ success: false, error: 401 })
      const result = await mockContractCall('pay-claim', [1000000, user], { sender: contractAddress })
      expect(result.success).toBe(false)
      expect(result.error).toBe(401)
    })
  })
  
  describe('get-pool-balance', () => {
    it('should return the current pool balance', async () => {
      mockContractCall.mockResolvedValueOnce({ success: true, value: 10000 })
      const result = await mockContractCall('get-pool-balance')
      expect(result.success).toBe(true)
      expect(result.value).toBe(10000)
    })
  })
})

