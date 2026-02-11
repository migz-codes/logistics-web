import { createClient } from '@supabase/supabase-js'
import { corsHeaders } from '../cors.ts'
import type { IErrorResponse } from '../types.ts'

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!)

export const validateAuth = async (req: Request) => {
  const authHeader = req.headers.get('Authorization')

  if (!authHeader) {
    const error: IErrorResponse = { error: { status: 401, message: 'MISSING AUTH HEADER' } }

    console.error(`❌ ${error.error.status}: ${error.error.message}`)

    return new Response(JSON.stringify(error), { status: 401, headers: corsHeaders })
  }

  const token = authHeader.replace('Bearer ', '')

  const { data, error } = await supabase.auth.getUser(token)

  const user = data?.user

  if (error || !user) {
    const error: IErrorResponse = { error: { status: 401, message: 'INVALID AUTH' } }

    console.error(`❌ ${error.error.status}: ${error.error.message}`)

    return new Response(JSON.stringify(error))
  }

  console.log('✅ VALID AUTH', user)

  const userRole = user.user_metadata?.user_role || user.app_metadata?.user_role || 'default'

  const userSupabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  )

  return { user, userSupabase, userRole }
}
