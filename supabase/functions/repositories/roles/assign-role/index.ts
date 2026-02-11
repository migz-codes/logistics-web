import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { corsHeaders } from '../../../_shared/cors.ts'
import { validateAuth } from '../../../_shared/validate-auth/index.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  console.log('🚀 ASSIGN ROLE REQUEST RECEIVED')

  const validation = await validateAuth(req)

  if (validation instanceof Response) return validation

  const { userSupabase, user, userRole } = validation

  if (userRole !== 'admin')
    return new Response(
      JSON.stringify({ error: { status: 403, message: 'Only admins can assign roles' } }),
      { status: 403, headers: corsHeaders }
    )

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({
          error: { status: 405, message: 'Method not allowed' }
        }),
        { status: 405, headers: corsHeaders }
      )
    }

    const body = await req.json()
    const { targetUserId, role } = body

    if (!targetUserId || !role) {
      return new Response(
        JSON.stringify({
          error: { status: 400, message: 'targetUserId and role are required' }
        }),
        { status: 400, headers: corsHeaders }
      )
    }

    if (!['admin', 'investor', 'default'].includes(role)) {
      return new Response(
        JSON.stringify({
          error: { status: 400, message: 'Invalid role. Must be admin, investor, or default' }
        }),
        { status: 400, headers: corsHeaders }
      )
    }

    const { data, error } = await userSupabase
      .from('user_roles')
      .upsert({ user_id: targetUserId, role: role }, { onConflict: 'user_id' })
      .select()
      .single()

    if (error) throw error

    console.log('✅ ROLE ASSIGNED', { targetUserId, role, assignedBy: user.id })

    return new Response(JSON.stringify({ message: 'Role assigned successfully', userRole: data }), {
      headers: corsHeaders
    })
  } catch (err) {
    console.error('❌ ERROR ASSIGNING ROLE', err)

    return new Response(
      JSON.stringify({
        error: {
          status: 400,
          message: err instanceof Error ? err.message : 'Failed to assign role'
        }
      }),
      { status: 400, headers: corsHeaders }
    )
  }
})
