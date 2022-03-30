import { useState, useCallback } from 'react'

async function fetchReq(url, config) {
  const response = await fetch(url, {
    method: config.method ?? 'GET',
    headers: config.header ?? {
      'Content-Type': 'application/json',
    },
    body: config.data ? JSON.stringify(config.data) : null,
  })

  if (!response.ok) {
    throw new Error('Something went wrong!')
  }

  return await response.json()
}

function useHttp(url, config, callback) {
  const { method, data, header } = config
  const [isLoading, setIsLoading] = useState(null)
  const [error, setError] = useState(null)

  const sendRequest = useCallback(async () => {
    try {
      setIsLoading(true)
      const responseData = await fetchReq(url, { method, data, header })

      callback(responseData)
    } catch (e) {
      setError(e)
    }
    setIsLoading(false)
  }, [url, method, data, header, callback])

  return {
    error,
    isLoading,
    sendRequest,
  }
}

export default useHttp
