'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Filter, 
  Download, 
  Layers, 
  Target,
  TrendingUp,
  TrendingDown,
  Activity,
  MapPin,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock
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

interface MapControlsProps {
  data: DepartmentData[]
  selectedFilter: 'all' | 'good' | 'warning' | 'critical'
  showEmergencyData: boolean
  onFilterChange: (filter: 'all' | 'good' | 'warning' | 'critical') => void
  onToggleEmergency: () => void
  onExportData: () => void
  onCenterMap: () => void
}

export default function MapControls({
  data,
  selectedFilter,
  showEmergencyData,
  onFilterChange,
  onToggleEmergency,
  onExportData,
  onCenterMap
}: MapControlsProps) {
  const [searchTerm, setSearchTerm] = useState('')

  // Vérification de sécurité pour éviter les erreurs avec des données vides
  if (!data || data.length === 0) {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-gray-500">
              <Activity className="h-8 w-8 mx-auto mb-2" />
              <p>Chargement des données...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleFilterClick = (filter: 'all' | 'good' | 'warning' | 'critical') => {
    onFilterChange(filter)
  }

  const handleEmergencyToggle = () => {
    onToggleEmergency()
  }

  const handleExportClick = () => {
    onExportData()
  }

  const handleCenterClick = () => {
    onCenterMap()
  }

  const filteredData = data.filter(dept => 
    dept && (selectedFilter === 'all' || dept.status === selectedFilter)
  )

  const searchResults = data.filter(dept =>
    dept && (
      dept?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept?.region?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept?.code?.includes(searchTerm)
    )
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />
      default: return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-500" />
      case 'down': return <TrendingDown className="h-3 w-3 text-red-500" />
      case 'stable': return <Activity className="h-3 w-3 text-blue-500" />
      default: return <Activity className="h-3 w-3 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      {/* Barre de recherche */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Search className="h-4 w-4 mr-2" />
            Recherche et Filtres
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un département ou une région..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Résultats de recherche */}
          {searchTerm && (
            <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg">
              {searchResults.map((dept) => (
                <div
                  key={dept.code}
                  className="p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer"
                  onClick={() => {
                    // Ici on pourrait centrer la carte sur ce département
                    setSearchTerm('')
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{dept.name}</p>
                      <p className="text-sm text-gray-600">{dept.region}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(dept.status)}
                      <span className="text-sm font-medium">{dept.coverage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Filtres par statut */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtrer par statut:</span>
            <div className="flex space-x-1">
              {[
                { key: 'all', label: 'Tous', color: 'gray', count: data.length },
                { key: 'good', label: 'OK', color: 'green', count: data.filter(d => d.status === 'good').length },
                { key: 'warning', label: 'Attention', color: 'yellow', count: data.filter(d => d.status === 'warning').length },
                { key: 'critical', label: 'Critique', color: 'red', count: data.filter(d => d.status === 'critical').length }
              ].map((filter) => (
                <Button
                  key={filter.key}
                  variant={selectedFilter === filter.key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterClick(filter.key as any)}
                  className={`${
                    selectedFilter === filter.key 
                      ? `bg-${filter.color}-600 hover:bg-${filter.color}-700` 
                      : ''
                  }`}
                >
                  {filter.label}
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {filter.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Layers className="h-4 w-4 mr-2" />
            Actions Rapides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleEmergencyToggle}
              className="flex items-center justify-center"
            >
              <Layers className="h-4 w-4 mr-2" />
              {showEmergencyData ? 'Masquer urgences' : 'Afficher urgences'}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleCenterClick}
              className="flex items-center justify-center"
            >
              <Target className="h-4 w-4 mr-2" />
              Centrer carte
            </Button>
            
            <Button
              variant="outline"
              onClick={handleExportClick}
              className="flex items-center justify-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Exporter CSV
            </Button>
            
            <Button
              variant="outline"
              onClick={() => console.log('Géolocalisation')}
              className="flex items-center justify-center"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Géolocaliser
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques détaillées */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Statistiques Détaillées
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-green-50 rounded-lg text-center">
              <p className="text-sm text-gray-600">Objectifs atteints</p>
              <p className="text-xl font-bold text-green-600">
                {data.filter(d => d.status === 'good').length}
              </p>
              <p className="text-xs text-gray-500">
                {((data.filter(d => d.status === 'good').length / data.length) * 100).toFixed(1)}%
              </p>
            </div>
            
            <div className="p-3 bg-yellow-50 rounded-lg text-center">
              <p className="text-sm text-gray-600">En cours</p>
              <p className="text-xl font-bold text-yellow-600">
                {data.filter(d => d.status === 'warning').length}
              </p>
              <p className="text-xs text-gray-500">
                {((data.filter(d => d.status === 'warning').length / data.length) * 100).toFixed(1)}%
              </p>
            </div>
            
            <div className="p-3 bg-red-50 rounded-lg text-center">
              <p className="text-sm text-gray-600">Action requise</p>
              <p className="text-xl font-bold text-red-600">
                {data.filter(d => d.status === 'critical').length}
              </p>
              <p className="text-xs text-gray-500">
                {((data.filter(d => d.status === 'critical').length / data.length) * 100).toFixed(1)}%
              </p>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg text-center">
              <p className="text-sm text-gray-600">Couverture moyenne</p>
              <p className="text-xl font-bold text-blue-600">
                {(data.reduce((sum, d) => sum + d.coverage, 0) / data.length).toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500">vs 75% objectif</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top 5 des départements prioritaires */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Top 5 Priorités
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {data
              .sort((a, b) => b.priority - a.priority)
              .slice(0, 5)
              .map((dept, index) => (
                <div
                  key={dept.code}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{dept.name}</p>
                      <p className="text-xs text-gray-600">{dept.region}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(dept.trend)}
                    <span className="text-sm font-medium">{dept.coverage}%</span>
                    <Badge 
                      variant={dept.status === 'critical' ? 'destructive' : 
                              dept.status === 'warning' ? 'secondary' : 'default'}
                      className="text-xs"
                    >
                      {dept.status === 'critical' ? 'Critique' : 
                       dept.status === 'warning' ? 'Attention' : 'OK'}
                    </Badge>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
