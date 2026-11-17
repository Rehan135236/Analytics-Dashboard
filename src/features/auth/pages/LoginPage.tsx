import { Link } from 'react-router-dom'
import { ROUTES } from '@/config/routes.config'

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400 font-bold text-xl mb-4 border border-indigo-500/30">
            N
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Nexus Analytics</h2>
          <p className="text-sm text-slate-400 mt-1">Sign in to your enterprise account</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Work Email</label>
            <input
              type="email"
              placeholder="alex@nexuscorp.internal"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              defaultValue="admin@nexus.io"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
            <input
              type="password"
              defaultValue="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <Link
            to={ROUTES.DASHBOARD}
            className="w-full mt-2 inline-flex items-center justify-center rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 text-sm transition-colors shadow-sm"
          >
            Enter Dashboard (Bypass Auth for Dev)
          </Link>
        </form>
      </div>
    </div>
  )
}
