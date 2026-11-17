import React, { useState } from 'react'
import { Moon, Sun, Monitor, Check, User, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { switchAppLanguage } from '@/locales/i18n'
import { useTheme, type Theme } from '@/features/settings/context/ThemeContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/forms/Input'
import { Select } from '@/components/forms/Select'
import { Badge } from '@/components/ui/Badge'

export const SettingsPage: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { t, i18n } = useTranslation()
  const [currentLng, setCurrentLng] = useState(i18n.language?.startsWith('ar') ? 'ar' : 'en')

  const handleLanguageChange = (lng: 'en' | 'ar') => {
    setCurrentLng(lng)
    switchAppLanguage(lng)
  }

  const themeOptions: Array<{ id: Theme; label: string; icon: React.ReactNode }> = [
    { id: 'dark', label: 'Dark Mode', icon: <Moon className="h-4 w-4" /> },
    { id: 'light', label: 'Light Mode', icon: <Sun className="h-4 w-4" /> },
    { id: 'system', label: 'System Default', icon: <Monitor className="h-4 w-4" /> },
  ]

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="border-b border-slate-800/60 pb-3">
        <h1 className="text-2xl font-bold tracking-tight text-white">{t('settingsTitle')}</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage system-wide visual appearance, localization, and administrator credentials.
        </p>
      </div>

      {/* Visual Appearance & Theme Selection */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Appearance & Theme Mode</CardTitle>
              <CardDescription>
                Select your preferred interface theme. Handled globally via React Context API.
              </CardDescription>
            </div>
            <Badge variant="info" size="sm">
              Active: {resolvedTheme.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {themeOptions.map((opt) => {
              const isSelected = theme === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTheme(opt.id)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border text-sm font-medium transition-all ${
                    isSelected
                      ? 'bg-indigo-600/15 border-indigo-500/60 text-indigo-300 shadow-xs'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {opt.icon}
                    <span>{opt.label}</span>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-indigo-400" />}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Internationalization Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-cyan-400" />
              <CardTitle>Internationalization & Bidirectional Layout (LTR / RTL)</CardTitle>
            </div>
            <Badge variant="info" size="sm">
              {currentLng.toUpperCase()} ({currentLng === 'ar' ? 'RTL' : 'LTR'})
            </Badge>
          </div>
          <CardDescription>
            Configure platform language and toggle between Left-to-Right and Right-to-Left Arabic display.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Active Locale"
              value={currentLng}
              onChange={(e) => handleLanguageChange(e.target.value as 'en' | 'ar')}
              options={[
                { value: 'en', label: 'English (US) — Left-to-Right (LTR)' },
                { value: 'ar', label: 'العربية (Arabic) — Right-to-Left (RTL)' },
              ]}
            />
            <Select
              label="Timezone Localization"
              options={[
                { value: 'utc', label: 'UTC (Coordinated Universal Time)' },
                { value: 'gulf', label: 'GST (Gulf Standard Time, UTC+4)' },
                { value: 'est', label: 'EST (Eastern Standard Time, UTC-5)' },
              ]}
              defaultValue="gulf"
            />
          </div>
        </CardContent>
      </Card>

      {/* Administrator Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Enterprise Administrator Profile</CardTitle>
          <CardDescription>
            Personal contact details and active organization credentials.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Display Name"
              defaultValue="Alex Developer"
              leftIcon={<User className="h-3.5 w-3.5" />}
            />
            <Input
              label="Work Email"
              defaultValue="alex@nexuscorp.internal"
              disabled
              helperText="Managed by corporate directory Single Sign-On (SSO)"
            />
          </div>
          <div className="pt-2 flex justify-end">
            <Button variant="primary" size="md">
              {t('saveChanges')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
