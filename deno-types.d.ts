declare module 'https://deno.land/std@0.224.0/http/server.ts' {
  export function serve(handler: (req: Request) => Promise<Response>): void
}

declare namespace Deno {
  export namespace env {
    export function get(key: string): string | undefined
  }
}
