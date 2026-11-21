// The ONLY place that decides which data source the dashboard uses.
// Set VITE_USE_SAMPLE_DATA=false in .env.development to use the real C# API.
import * as sampleApi from './sample-data.js'
import * as realApi from './registrationsApi.js'

const useSample = import.meta.env.VITE_USE_SAMPLE_DATA !== 'false'

export const { getRegistrations, getSummary } = useSample ? sampleApi : realApi
export const usingSampleData = useSample
