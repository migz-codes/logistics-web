import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { corsHeaders } from '../../../_shared/cors.ts'
import { validateAuth } from '../../../_shared/validate-auth/index.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  console.log('🚀 GET PROPERTIES REQUEST RECEIVED')

  const validation = await validateAuth(req)

  if (validation instanceof Response) return validation

  const { userSupabase, user } = validation

  try {
    const { data: properties, error } = await userSupabase
      .from('properties')
      .select('*')
      .eq('accountable_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    console.log('✅ PROPERTIES RETRIEVED', { count: properties?.length || 0 })

    return new Response(
      JSON.stringify({ properties: properties || [], count: properties?.length || 0 }),
      { headers: corsHeaders }
    )
  } catch (err) {
    console.error('❌ ERROR GETTING PROPERTIES', err)

    return new Response(
      JSON.stringify({
        error: {
          status: 400,
          message: err instanceof Error ? err.message : 'Failed to get properties'
        }
      })
    )
  }
})
