import React from 'react'
import { ShieldCheck, ShieldAlert, Eye, UserPlus, Power } from 'lucide-react'
import { useUsersData } from '../hooks/useUsersData'
import { useAppDispatch, useAppSelector } from '@/store/redux/hooks'
import { switchPersona } from '@/store/redux/slices/authSlice'
import type { UserRole } from '@/types/auth.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'

export const UsersPage: React.FC = () => {
  const { users, isLoading, toggleUserStatus } = useUsersData()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.auth.user)

  const handlePersonaSwitch = (role: UserRole) => {
    dispatch(switchPersona(role))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-white">User & Access Management</h1>
            <Badge variant="info" size="sm">
              RBAC Enabled
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Directory of corporate users, granular role assignments, and permission matrices.
          </p>
        </div>

        {/* Current Active Persona & Role Switcher */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
          <span className="text-xs text-slate-400 px-2 font-medium">Test Persona:</span>
          {(['SuperAdmin', 'Analyst', 'Viewer'] as UserRole[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => handlePersonaSwitch(r)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                currentUser?.role === r
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Role Permission Matrix Card */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permission Matrix</CardTitle>
          <CardDescription>
            System privileges assigned per enterprise security classification.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
                <ShieldCheck className="h-4 w-4" />
                <span>SuperAdmin</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Full governance privileges: Add/edit records, provision users, manage billing, and alter telemetry configs.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <ShieldAlert className="h-4 w-4" />
                <span>Analyst</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Operational privileges: Create custom charts, export datasets (CSV/PDF), and execute ad-hoc telemetry queries.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-slate-400 font-semibold text-sm">
                <Eye className="h-4 w-4" />
                <span>Viewer</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Read-only privileges: View executive dashboards and real-time feeds without mutation capabilities.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Directory Table */}
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Corporate User Directory ({users.length})</CardTitle>
            <Button variant="secondary" size="sm" leftIcon={<UserPlus className="h-3.5 w-3.5" />}>
              Invite Member
            </Button>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Active</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/30">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={6} className="p-4">
                      <Skeleton className="h-6 w-full" />
                    </td>
                  </tr>
                ))
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold text-xs">
                          {u.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-100">{u.name}</p>
                          <span className="text-[11px] text-slate-400 font-mono">{u.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{u.department}</td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={
                          u.role === 'SuperAdmin'
                            ? 'info'
                            : u.role === 'Analyst'
                            ? 'success'
                            : 'default'
                        }
                        size="sm"
                      >
                        {u.role}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={u.isActive ? 'success' : 'outline'} size="sm" dot={u.isActive}>
                        {u.isActive ? 'Active' : 'Suspended'}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {u.lastLogin}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleUserStatus(u.id)}
                        className={u.isActive ? 'text-amber-400 hover:text-amber-300' : 'text-emerald-400 hover:text-emerald-300'}
                        title={u.isActive ? 'Suspend access' : 'Reactivate access'}
                      >
                        <Power className="h-3.5 w-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
