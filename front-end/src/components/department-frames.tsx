'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import DepartmentFrame from './department-frame'

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

interface DepartmentFramesProps {
  data: DepartmentData[]
}

export default function DepartmentFrames({ data }: DepartmentFramesProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p>Chargement des départements...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Trier par priorité (plus haute priorité en premier)
  const sortedData = [...data].sort((a, b) => b.priority - a.priority)

  return (
    <Card className="chart-container">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
          📊 Frames des Départements
        </CardTitle>
        <p className="text-xs text-gray-600">
          Vue détaillée de chaque département avec métriques et recommandations
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedData.map((dept, index) => (
            <DepartmentFrame 
              key={dept.code} 
              data={dept} 
              index={index}
            />
          ))}
        </div>
        
        {/* Résumé statistique */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-xl font-bold text-green-600">
              {data.filter(d => d.status === 'good').length}
            </div>
            <div className="text-xs text-green-700">Objectifs atteints</div>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 rounded-xl">
            <div className="text-xl font-bold text-yellow-600">
              {data.filter(d => d.status === 'warning').length}
            </div>
            <div className="text-xs text-yellow-700">En cours</div>
          </div>
          
          <div className="text-center p-4 bg-red-50 rounded-xl">
            <div className="text-xl font-bold text-red-600">
              {data.filter(d => d.status === 'critical').length}
            </div>
            <div className="text-xs text-red-700">Action requise</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-xl font-bold text-blue-600">
              {(data.reduce((sum, d) => sum + d.coverage, 0) / data.length).toFixed(1)}%
            </div>
            <div className="text-xs text-blue-700">Couverture moyenne</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
