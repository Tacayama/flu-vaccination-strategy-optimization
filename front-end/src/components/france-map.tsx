'use client'

import { useEffect, useState } from 'react'
import L from 'leaflet'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Import dynamique pour éviter les erreurs SSR avec Leaflet
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const GeoJSON = dynamic(() => import('react-leaflet').then(mod => mod.GeoJSON), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })
const Tooltip = dynamic(() => import('react-leaflet').then(mod => mod.Tooltip), { ssr: false })

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

interface FranceMapProps {
  data: DepartmentData[]
  selectedFilter: 'all' | 'good' | 'warning' | 'critical'
  showEmergencyData: boolean
  onFilterChange: (filter: 'all' | 'good' | 'warning' | 'critical') => void
  onToggleEmergency: () => void
  onExportData: () => void
  onCenterMap: () => void
}

// Données géographiques simplifiées des départements français
const FRANCE_DEPARTMENTS_GEOJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { code: "75", name: "Paris", region: "Île-de-France" },
      geometry: {
        type: "Polygon",
        coordinates: [[[2.1, 48.7], [2.5, 48.7], [2.5, 49.0], [2.1, 49.0], [2.1, 48.7]]]
      }
    },
    {
      type: "Feature",
      properties: { code: "69", name: "Rhône", region: "Auvergne-Rhône-Alpes" },
      geometry: {
        type: "Polygon",
        coordinates: [[[4.5, 45.5], [5.0, 45.5], [5.0, 46.0], [4.5, 46.0], [4.5, 45.5]]]
      }
    },
    {
      type: "Feature",
      properties: { code: "13", name: "Bouches-du-Rhône", region: "Provence-Alpes-Côte d'Azur" },
      geometry: {
        type: "Polygon",
        coordinates: [[[5.0, 43.0], [5.5, 43.0], [5.5, 43.5], [5.0, 43.5], [5.0, 43.0]]]
      }
    },
    {
      type: "Feature",
      properties: { code: "31", name: "Haute-Garonne", region: "Occitanie" },
      geometry: {
        type: "Polygon",
        coordinates: [[[1.0, 43.3], [1.8, 43.3], [1.8, 44.0], [1.0, 44.0], [1.0, 43.3]]]
      }
    },
    {
      type: "Feature",
      properties: { code: "06", name: "Alpes-Maritimes", region: "Provence-Alpes-Côte d'Azur" },
      geometry: {
        type: "Polygon",
        coordinates: [[[6.8, 43.5], [7.5, 43.5], [7.5, 44.2], [6.8, 44.2], [6.8, 43.5]]]
      }
    },
    {
      type: "Feature",
      properties: { code: "33", name: "Gironde", region: "Nouvelle-Aquitaine" },
      geometry: {
        type: "Polygon",
        coordinates: [[[-1.0, 44.5], [-0.2, 44.5], [-0.2, 45.2], [-1.0, 45.2], [-1.0, 44.5]]]
      }
    },
    {
      type: "Feature",
      properties: { code: "44", name: "Loire-Atlantique", region: "Pays de la Loire" },
      geometry: {
        type: "Polygon",
        coordinates: [[[-2.5, 47.0], [-1.5, 47.0], [-1.5, 47.5], [-2.5, 47.5], [-2.5, 47.0]]]
      }
    },
    {
      type: "Feature",
      properties: { code: "67", name: "Bas-Rhin", region: "Grand Est" },
      geometry: {
        type: "Polygon",
        coordinates: [[[7.0, 48.0], [8.0, 48.0], [8.0, 49.0], [7.0, 49.0], [7.0, 48.0]]]
      }
    }
  ]
}

export default function FranceMap({ 
  data, 
  selectedFilter, 
  showEmergencyData, 
  onFilterChange, 
  onToggleEmergency, 
  onExportData, 
  onCenterMap 
}: FranceMapProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Vérification de sécurité pour éviter les erreurs avec des données vides
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Carte Interactive de la France</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-500">Chargement des données...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return '#10B981'
      case 'warning': return '#F59E0B'
      case 'critical': return '#EF4444'
      default: return '#6B7280'
    }
  }

  const getStatusOpacity = (status: string) => {
    switch (status) {
      case 'good': return 0.7
      case 'warning': return 0.8
      case 'critical': return 0.9
      default: return 0.5
    }
  }

  const filteredData = data.filter(dept => 
    dept && (selectedFilter === 'all' || dept.status === selectedFilter)
  )

  const onEachFeature = (feature: any, layer: any) => {
    const deptCode = feature.properties.code
    const deptData = data.find(d => d.code === deptCode)
    
    if (!deptData) return

    const color = getStatusColor(deptData.status)
    const opacity = getStatusOpacity(deptData.status)

    layer.setStyle({
      fillColor: color,
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: opacity,
      className: 'department-polygon'
    })

    // Tooltip au survol
    layer.bindTooltip(`
      <div class="p-2 min-w-[200px]">
        <h3 class="font-bold text-lg">${deptData.name}</h3>
        <div class="space-y-1 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600">Couverture:</span>
            <span class="font-semibold ${deptData.coverage >= deptData.target ? 'text-green-600' : 'text-red-600'}">
              ${deptData.coverage}%
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Objectif:</span>
            <span class="font-semibold">${deptData.target}%</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Population:</span>
            <span class="font-semibold">${deptData.population.toLocaleString()}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Stock:</span>
            <span class="font-semibold ${deptData.stockDays < 5 ? 'text-red-600' : deptData.stockDays < 8 ? 'text-yellow-600' : 'text-green-600'}">
              ${deptData.stockDays} jours
            </span>
          </div>
        </div>
      </div>
    `, {
      direction: 'top',
      offset: [0, -10]
    })

    // Popup détaillé au clic
    layer.bindPopup(`
      <div class="p-4 min-w-[300px]">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-bold text-xl">${deptData.name}</h3>
          <span class="px-2 py-1 rounded text-xs font-medium ${
            deptData.status === 'good' ? 'bg-green-100 text-green-800' :
            deptData.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }">
            ${deptData.status === 'good' ? '✓ Objectif atteint' : 
              deptData.status === 'warning' ? '⚠ Attention' : 
              '🚨 Action requise'}
          </span>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Couverture:</span>
              <span class="font-semibold ${deptData.coverage >= deptData.target ? 'text-green-600' : 'text-red-600'}">
                ${deptData.coverage}%
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Objectif:</span>
              <span class="font-semibold">${deptData.target}%</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Écart:</span>
              <span class="font-semibold ${deptData.target - deptData.coverage > 0 ? 'text-red-600' : 'text-green-600'}">
                ${deptData.target - deptData.coverage > 0 ? '-' : '+'}${Math.abs(deptData.target - deptData.coverage).toFixed(1)}%
              </span>
            </div>
          </div>
          
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Population:</span>
              <span class="font-semibold">${deptData.population.toLocaleString()}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Doses:</span>
              <span class="font-semibold">${deptData.doses.toLocaleString()}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Stock:</span>
              <span class="font-semibold ${deptData.stockDays < 5 ? 'text-red-600' : deptData.stockDays < 8 ? 'text-yellow-600' : 'text-green-600'}">
                ${deptData.stockDays} jours
              </span>
            </div>
          </div>
        </div>
        
        ${showEmergencyData ? `
        <div class="border-t pt-3">
          <h4 class="font-semibold text-sm mb-2">Données d'urgence</h4>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">Urgences:</span>
              <span class="font-medium">${deptData.emergencyRate}/100k</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">SOS Médecins:</span>
              <span class="font-medium">${deptData.sosRate}/100k</span>
            </div>
          </div>
        </div>
        ` : ''}
        
        <div class="border-t pt-3 mt-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Tendance:</span>
            <span class="text-sm font-medium">
              ${deptData.trend === 'up' ? '📈 En hausse' : 
                deptData.trend === 'down' ? '📉 En baisse' : '📊 Stable'}
            </span>
          </div>
          <div class="flex items-center justify-between mt-1">
            <span class="text-sm text-gray-600">Priorité:</span>
            <span class="text-sm font-medium">${deptData.priority}/10</span>
          </div>
        </div>
      </div>
    `)

    // Animation au survol
    layer.on('mouseover', function() {
      this.setStyle({
        weight: 3,
        fillOpacity: 0.9
      })
    })

    layer.on('mouseout', function() {
      this.setStyle({
        weight: 2,
        fillOpacity: opacity
      })
    })
  }

  if (!isClient) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Carte Interactive de la France</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-500">Chargement de la carte...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Carte Interactive de la France</CardTitle>
            <p className="text-sm text-gray-600">Couverture vaccinale par département</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {filteredData.length} département{filteredData.length > 1 ? 's' : ''} affiché{filteredData.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Carte */}
        <div className="h-96 rounded-lg overflow-hidden border">
          <MapContainer
            center={[46.5, 2.0]}
            zoom={6}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            <GeoJSON
              data={FRANCE_DEPARTMENTS_GEOJSON}
              onEachFeature={onEachFeature}
            />
            
            {/* Marqueurs pour les données d'urgence si activées (DivIcon) */}
            {showEmergencyData && filteredData.map((dept) => {
              const emergencyIcon = L.divIcon({
                className: 'emergency-div-icon',
                html: `<div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>`,
                iconSize: [12, 12],
                iconAnchor: [6, 6]
              })

              return (
                <Marker
                  key={`emergency-${dept.code}`}
                  position={[dept.lat, dept.lng]}
                  icon={emergencyIcon}
                >
                  <Tooltip>
                    <div className="p-2">
                      <h4 className="font-bold">{dept.name}</h4>
                      <p className="text-sm">Urgences: {dept.emergencyRate}/100k</p>
                      <p className="text-sm">SOS: {dept.sosRate}/100k</p>
                    </div>
                  </Tooltip>
                </Marker>
              )
            })}
          </MapContainer>
        </div>
        
        {/* Légende améliorée */}
        <div className="mt-4 space-y-3">
          <div className="flex justify-center space-x-6">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600">≥ 75% - Objectif atteint</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600">60-74% - En cours</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600">&lt; 60% - Action requise</span>
            </div>
          </div>
          
          {showEmergencyData && (
            <div className="flex justify-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Marqueurs bleus = Données d'urgence</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Statistiques détaillées */}
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 bg-green-50 rounded-lg text-center">
            <p className="text-sm text-gray-600">Objectifs atteints</p>
            <p className="text-2xl font-bold text-green-600">
              {data.filter(d => d.status === 'good').length}
            </p>
            <p className="text-xs text-gray-500">
              {((data.filter(d => d.status === 'good').length / data.length) * 100).toFixed(1)}%
            </p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg text-center">
            <p className="text-sm text-gray-600">En cours</p>
            <p className="text-2xl font-bold text-yellow-600">
              {data.filter(d => d.status === 'warning').length}
            </p>
            <p className="text-xs text-gray-500">
              {((data.filter(d => d.status === 'warning').length / data.length) * 100).toFixed(1)}%
            </p>
          </div>
          <div className="p-3 bg-red-50 rounded-lg text-center">
            <p className="text-sm text-gray-600">Action requise</p>
            <p className="text-2xl font-bold text-red-600">
              {data.filter(d => d.status === 'critical').length}
            </p>
            <p className="text-xs text-gray-500">
              {((data.filter(d => d.status === 'critical').length / data.length) * 100).toFixed(1)}%
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg text-center">
            <p className="text-sm text-gray-600">Couverture moyenne</p>
            <p className="text-2xl font-bold text-blue-600">
              {(data.reduce((sum, d) => sum + d.coverage, 0) / data.length).toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500">vs 75% objectif</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}