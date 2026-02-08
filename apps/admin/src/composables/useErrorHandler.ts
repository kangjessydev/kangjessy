import { ref } from 'vue'

export interface AppError {
  message: string
  code?: string
  details?: any
  timestamp: Date
}

const globalError = ref<AppError | null>(null)
const errorHistory = ref<AppError[]>([])

export const useErrorHandler = () => {
  /**
   * Handle error with user-friendly message
   */
  const handleError = (error: any, context?: string) => {
    console.error(`[Error Handler] ${context || 'Unknown'}:`, error)

    let message = 'An unexpected error occurred. Please try again.'
    let code = 'UNKNOWN_ERROR'

    // Supabase errors
    if (error?.code) {
      code = error.code
      message = error.message || message
    }

    // Network errors
    if (error?.message?.includes('fetch') || error?.message?.includes('network')) {
      message = 'Network error. Please check your connection.'
      code = 'NETWORK_ERROR'
    }

    // Auth errors
    if (error?.message?.includes('auth') || error?.message?.includes('token')) {
      message = 'Authentication failed. Please login again.'
      code = 'AUTH_ERROR'
    }

    // Validation errors
    if (error?.message?.includes('validation') || error?.message?.includes('invalid')) {
      message = error.message || 'Validation failed. Please check your input.'
      code = 'VALIDATION_ERROR'
    }

    // 404 Not Found
    if (error?.status === 404 || error?.message?.includes('not found')) {
      message = 'Resource not found.'
      code = 'NOT_FOUND'
    }

    // 403 Forbidden
    if (error?.status === 403) {
      message = 'You do not have permission to perform this action.'
      code = 'FORBIDDEN'
    }

    const appError: AppError = {
      message,
      code,
      details: error,
      timestamp: new Date()
    }

    globalError.value = appError
    errorHistory.value.unshift(appError)

    // Keep only last 10 errors
    if (errorHistory.value.length > 10) {
      errorHistory.value = errorHistory.value.slice(0, 10)
    }

    return appError
  }

  /**
   * Clear current error
   */
  const clearError = () => {
    globalError.value = null
  }

  /**
   * Get error-safe wrapper for async functions
   */
  const withErrorHandling = async <T>(
    fn: () => Promise<T>,
    context?: string,
    fallbackValue?: T
  ): Promise<T | undefined> => {
    try {
      return await fn()
    } catch (error) {
      handleError(error, context)
      return fallbackValue
    }
  }

  /**
   * Retry function with exponential backoff
   */
  const retryWithBackoff = async <T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    initialDelay = 1000
  ): Promise<T> => {
    let lastError: any

    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn()
      } catch (error) {
        lastError = error
        if (i < maxRetries - 1) {
          const delay = initialDelay * Math.pow(2, i)
          await new Promise(resolve => setTimeout(resolve, delay))
        }
      }
    }

    throw lastError
  }

  return {
    globalError,
    errorHistory,
    handleError,
    clearError,
    withErrorHandling,
    retryWithBackoff
  }
}
