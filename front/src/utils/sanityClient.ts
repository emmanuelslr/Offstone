import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ok0g8o46',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-07-01',
})

export default client
