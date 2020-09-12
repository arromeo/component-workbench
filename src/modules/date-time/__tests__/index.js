import * as DateTime from '../../date-time/index'

describe('DateTime', () => {
  describe('isPast', () => {
    it('should return true when date is in past', () => {
      const pastDate = new Date(1900, 0, 1)
      const result = DateTime.isPast(pastDate)

      expect(result).toBe(true)
    })
    it('should return false when date is in the future', () => {
      const futureDate = new Date(3000, 0, 1)
      const result = DateTime.isPast(futureDate)

      expect(result).toBe(false)
    })
  })

  describe('getDaysInMonth', () => {
    it('should return 31 if date falls in January', () => {
      const result = DateTime.getDaysInMonth(0, 2020)

      expect(result).toBe(31)
    })
    it('should return 29 when date falls in a leap month', () => {
      const result = DateTime.getDaysInMonth(1, 2020)

      expect(result).toBe(29)
    })
    it('should return 30 if date falls in November', () => {
      const result = DateTime.getDaysInMonth(10, 2019)

      expect(result).toBe(30)
    })
    it('should return 31 if date falls in December', () => {
      const result = DateTime.getDaysInMonth(11, 2019)

      expect(result).toBe(31)
    })
  })

  describe('getFirstDayOfMonth', () => {
    it('should return 2 if the month starts on a Tuesday', () => {
      const result = DateTime.getFirstDayOfMonth(8, 2020)

      expect(result).toBe(2)
    })
    it('should return 0 if the month starts on a Sunday', () => {
      const result = DateTime.getFirstDayOfMonth(10, 2020)

      expect(result).toBe(0)
    })
  })

  describe('checkIfPastMonth', () => {
    it('should return true if the given month is in the past', () => {
      const result = DateTime.checkIfPastMonth(0, 1900)

      expect(result).toBe(true)
    })
    it('should return false if the given month is in the future', () => {
      const result = DateTime.checkIfPastMonth(0, 2900)

      expect(result).toBe(false)
    })
    it('should return false if the given month is the current month', () => {
      const currentDate = new Date()
      const result = DateTime.checkIfPastMonth(
        currentDate.getMonth(),
        currentDate.getFullYear()
      )

      expect(result).toBe(false)
    })
  })

  describe('checkIfCurrentMonth', () => {
    it('should return false if the given month is in the past', () => {
      const result = DateTime.checkIfCurrentMonth(0, 1900)

      expect(result).toBe(false)
    })
    it('should return false if the given month is in the future', () => {
      const result = DateTime.checkIfCurrentMonth(0, 2900)

      expect(result).toBe(false)
    })
    it('should return true if the given month is the current month', () => {
      const currentDate = new Date()
      const result = DateTime.checkIfCurrentMonth(
        currentDate.getMonth(),
        currentDate.getFullYear()
      )

      expect(result).toBe(true)
    })
  })
})
