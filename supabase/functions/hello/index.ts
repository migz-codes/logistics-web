import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'
import { validateAuth } from '../_shared/validate-auth/index.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  console.log('🚀 REQUEST RECEIVED')

  const validation = await validateAuth(req)

  if (validation instanceof Response) return validation

  const { user } = validation

  console.log('✅ RESPONSE SENT', { user })

  return new Response(JSON.stringify({ user }), { headers: corsHeaders })
})
