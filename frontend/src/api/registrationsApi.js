// Real fetch calls to the C# API. Same function names and return shapes as sample-data.js.

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5205').replace(/\/$/, '')

async function request(path, params = {}) {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    // Empty filters are not sent, so "All" means "no filter".
    if (value !== '' && value !== null && value !== undefined) query.set(key, value)
  })
  const qs = query.toString()

  let response
  try {
    response = await fetch(`${BASE_URL}${path}${qs ? `?${qs}` : ''}`)
  } catch {
    // Network error: API stopped, wrong URL or CORS blocked.
    throw new Error(`Cannot reach the API at ${BASE_URL}. Is the backend running?`)
  }

  if (!response.ok) {
    throw new Error(await readProblemDetails(response))
  }
  return response.json()
}

/** Turns a ProblemDetails response into a readable message instead of raw JSON. */
async function readProblemDetails(response) {
  try {
    const problem = await response.json()
    if (problem.errors) {
      return Object.entries(problem.errors)
        .map(([field, messages]) => `${field}: ${[].concat(messages).join(' ')}`)
        .join(' | ')
    }
    return problem.detail || problem.title || `Request failed (${response.status})`
  } catch {
    return `Request failed (${response.status})`
  }
}

export function getRegistrations({ participantName = '', type = '', status = '', page = 1, pageSize = 10 } = {}) {
  return request('/api/registrations', { participantName: participantName.trim(), type, status, page, pageSize })
}

export function getSummary() {
  return request('/api/registrations/summary')
}
