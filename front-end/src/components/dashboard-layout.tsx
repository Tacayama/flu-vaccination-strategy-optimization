'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { 
  BarChart3, 
  MapPin, 
  AlertTriangle, 
  Calendar, 
  Users,
  Shield,
  Settings
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Vue d\'ensemble', href: '/', icon: BarChart3 },
  { name: 'Pharmacies', href: '/pharmacies', icon: MapPin },
  { name: 'Urgences', href: '/emergency', icon: AlertTriangle },
  { name: 'Planification', href: '/planning', icon: Calendar },
  { name: 'Équité', href: '/equity', icon: Users },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    setCurrentTime(new Date().toLocaleString('fr-FR'))
    
    // Update time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString('fr-FR'))
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h1 className="ml-4 text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Dashboard Vaccination Grippe
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200/50">
                <span className="text-sm text-gray-600 font-medium">
                  Dernière mise à jour: {currentTime || 'Chargement...'}
                </span>
              </div>
              <Button variant="ghost" size="icon" className="hover:bg-blue-50 rounded-xl">
                <Settings className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white/80 backdrop-blur-md shadow-xl border-r border-gray-200/50 min-h-screen">
          <div className="p-6">
            <ul className="space-y-3">
              {navigation.map((item, index) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-4 py-3 text-xs font-semibold rounded-xl transition-all duration-200 group animate-fade-in-up",
                        isActive
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105'
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 hover:shadow-md hover:transform hover:scale-105'
                      )}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Icon className={cn("h-5 w-5 mr-3", isActive ? 'text-white' : 'text-gray-500 group-hover:text-blue-600')} />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 p-8 bg-gradient-to-br from-transparent to-white/30">
          <div className="animate-fade-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
