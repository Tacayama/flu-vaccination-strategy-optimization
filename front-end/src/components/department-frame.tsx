'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Users, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Package,
  Target
} from 'lucide-react'

interface DepartmentData {
  code: string
  name: string
  coverage: number
  target: number
  status: 'good' | 'warning' | 'critical'
  population: number
  doses: number
  lat: number
  lng: number
  region: string
  trend: 'up' | 'down' | 'stable'
  emergencyRate: number
  sosRate: number
  stockDays: number
  priority: number
}

interface DepartmentFrameProps {
  data: DepartmentData
  index: number
}

export default function DepartmentFrame({ data, index }: DepartmentFrameProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-500" />
      default: return <Activity className="h-5 w-5 text-gray-500" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />
      case 'stable': return <Activity className="h-4 w-4 text-blue-500" />
      default: return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'success-card'
      case 'warning': return 'warning-card'
      case 'critical': return 'alert-card'
      default: return 'metric-card'
    }
  }

  const getPriorityColor = (priority: number) => {
    if (priority >= 8) return 'text-red-600 bg-red-100'
    if (priority >= 5) return 'text-yellow-600 bg-yellow-100'
    return 'text-green-600 bg-green-100'
  }

  const getStockColor = (stockDays: number) => {
    if (stockDays < 5) return 'text-red-600'
    if (stockDays < 8) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <Card className={`${getStatusColor(data.status)} animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold text-gray-900 flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-blue-600" />
            {data.name}
          </CardTitle>
          <div className="flex items-center space-x-2">
            {getStatusIcon(data.status)}
            <Badge className={`${getPriorityColor(data.priority)} px-2 py-1 text-xs font-medium`}>
              Priorité {data.priority}/10
            </Badge>
          </div>
        </div>
        <p className="text-xs text-gray-600">{data.region}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Métriques principales */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white/60 rounded-lg">
            <div className="text-lg font-bold text-gray-900">{data.coverage}%</div>
            <div className="text-xs text-gray-600">Couverture</div>
            <div className="text-xs text-gray-500">Objectif: {data.target}%</div>
          </div>
          
          <div className="text-center p-3 bg-white/60 rounded-lg">
            <div className="text-lg font-bold text-gray-900">{data.doses.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Doses</div>
            <div className="text-xs text-gray-500">Cette semaine</div>
          </div>
        </div>

        {/* Indicateurs de statut */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Population:</span>
            <span className="text-sm font-medium">{data.population.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Stock:</span>
            <span className={`text-sm font-medium ${getStockColor(data.stockDays)}`}>
              {data.stockDays} jours
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Tendance:</span>
            <div className="flex items-center">
              {getTrendIcon(data.trend)}
              <span className="text-sm font-medium ml-1">
                {data.trend === 'up' ? 'En hausse' : 
                 data.trend === 'down' ? 'En baisse' : 'Stable'}
              </span>
            </div>
          </div>
        </div>

        {/* Données d'urgence */}
        <div className="border-t pt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Données d'urgence</span>
            <Package className="h-4 w-4 text-gray-500" />
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Urgences:</span>
              <span className="font-medium">{data.emergencyRate}/100k</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">SOS:</span>
              <span className="font-medium">{data.sosRate}/100k</span>
            </div>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Progression vers l'objectif</span>
            <span className="font-medium">{((data.coverage / data.target) * 100).toFixed(1)}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                data.coverage >= data.target ? 'bg-green-500' :
                data.coverage >= data.target * 0.8 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min((data.coverage / data.target) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Actions recommandées */}
        <div className="border-t pt-3">
          <div className="text-xs text-gray-600 mb-1">Actions recommandées:</div>
          <div className="text-xs">
            {data.status === 'critical' && (
              <span className="text-red-600 font-medium">🚨 Intervention urgente requise</span>
            )}
            {data.status === 'warning' && (
              <span className="text-yellow-600 font-medium">⚠️ Planification des actions correctives</span>
            )}
            {data.status === 'good' && (
              <span className="text-green-600 font-medium">✅ Surveillance continue</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
