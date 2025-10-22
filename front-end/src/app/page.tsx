'use client'

import { useState, useEffect } from 'react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  Target, 
  Activity,
  AlertCircle,
  CheckCircle,
  Download,
  Settings
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '@/components/ui/metrics'
import DashboardLayout from '@/components/dashboard-layout'
import FranceMap from '@/components/france-map'
import MapControls from '@/components/map-controls'
import DepartmentFrames from '@/components/department-frames'

interface CoverageData {
  name: string
  department: string
  code: string
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

interface CampaignData {
  week: string
  doses: number
  target: number
  coverage: number
}

interface EmergencyData {
  week: string
  emergency: number
  sos: number
  predicted: number
}

export default function OverviewPage() {
  const [coverageData, setCoverageData] = useState<CoverageData[]>([])
  const [campaignData, setCampaignData] = useState<CampaignData[]>([])
  const [emergencyData, setEmergencyData] = useState<EmergencyData[]>([])
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'good' | 'warning' | 'critical'>('all')
  const [showEmergencyData, setShowEmergencyData] = useState(false)

  const handleFilterChange = (filter: 'all' | 'good' | 'warning' | 'critical') => {
    setSelectedFilter(filter)
  }

  const handleToggleEmergency = () => {
    setShowEmergencyData(!showEmergencyData)
  }

  const handleExportData = () => {
    const csvData = coverageData.map(dept => ({
      Département: dept.name,
      Code: dept.code,
      Couverture: `${dept.coverage}%`,
      Objectif: `${dept.target}%`,
      Statut: dept.status,
      Population: dept.population,
      Doses: dept.doses,
      Stock: `${dept.stockDays} jours`,
      Priorité: dept.priority,
      Tendance: dept.trend,
      Région: dept.region
    }))

    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'couverture-vaccination-france.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleCenterMap = () => {
    // Cette fonction sera implémentée dans le composant FranceMap
  }

  useEffect(() => {
    // Mock data - in real implementation, this would come from API
    setCoverageData([
      { 
        name: 'Paris', department: 'Paris', code: '75', coverage: 65.2, target: 75, status: 'warning', 
        population: 12000000, doses: 45000, lat: 48.8566, lng: 2.3522,
        region: 'Île-de-France', trend: 'up', emergencyRate: 1250, sosRate: 3200,
        stockDays: 8.6, priority: 7
      },
      { 
        name: 'Lyon', department: 'Lyon', code: '69', coverage: 58.7, target: 75, status: 'critical', 
        population: 1800000, doses: 28000, lat: 45.7640, lng: 4.8357,
        region: 'Auvergne-Rhône-Alpes', trend: 'down', emergencyRate: 1450, sosRate: 3800,
        stockDays: 6.2, priority: 9
      },
      { 
        name: 'Marseille', department: 'Marseille', code: '13', coverage: 72.1, target: 75, status: 'good', 
        population: 2000000, doses: 52000, lat: 43.2965, lng: 5.3698,
        region: 'Provence-Alpes-Côte d\'Azur', trend: 'stable', emergencyRate: 980, sosRate: 2400,
        stockDays: 12.1, priority: 3
      },
      { 
        name: 'Toulouse', department: 'Toulouse', code: '31', coverage: 68.9, target: 75, status: 'warning', 
        population: 1500000, doses: 32000, lat: 43.6047, lng: 1.4442,
        region: 'Occitanie', trend: 'up', emergencyRate: 1100, sosRate: 2800,
        stockDays: 7.4, priority: 6
      },
      { 
        name: 'Nice', department: 'Nice', code: '06', coverage: 54.3, target: 75, status: 'critical', 
        population: 1100000, doses: 18000, lat: 43.7102, lng: 7.2620,
        region: 'Provence-Alpes-Côte d\'Azur', trend: 'down', emergencyRate: 1600, sosRate: 4200,
        stockDays: 4.8, priority: 10
      },
      { 
        name: 'Bordeaux', department: 'Bordeaux', code: '33', coverage: 71.5, target: 75, status: 'good', 
        population: 1600000, doses: 48000, lat: 44.8378, lng: -0.5792,
        region: 'Nouvelle-Aquitaine', trend: 'stable', emergencyRate: 850, sosRate: 2100,
        stockDays: 11.2, priority: 2
      },
      { 
        name: 'Nantes', department: 'Nantes', code: '44', coverage: 69.8, target: 75, status: 'warning', 
        population: 1400000, doses: 35000, lat: 47.2184, lng: -1.5536,
        region: 'Pays de la Loire', trend: 'up', emergencyRate: 920, sosRate: 2300,
        stockDays: 8.9, priority: 5
      },
      { 
        name: 'Strasbourg', department: 'Strasbourg', code: '67', coverage: 66.4, target: 75, status: 'warning', 
        population: 1200000, doses: 28000, lat: 48.5734, lng: 7.7521,
        region: 'Grand Est', trend: 'stable', emergencyRate: 1050, sosRate: 2600,
        stockDays: 7.8, priority: 8
      }
    ])

    setCampaignData([
      { week: 'S40', doses: 32000, target: 48000, coverage: 62.5 },
      { week: 'S41', doses: 35000, target: 48000, coverage: 64.2 },
      { week: 'S42', doses: 38000, target: 48000, coverage: 65.8 },
      { week: 'S43', doses: 41000, target: 48000, coverage: 67.1 },
      { week: 'S44', doses: 42000, target: 48000, coverage: 68.5 },
      { week: 'S45', doses: 44000, target: 48000, coverage: 69.8 },
      { week: 'S46', doses: 45000, target: 48000, coverage: 71.2 },
      { week: 'S47', doses: 46000, target: 48000, coverage: 72.5 },
    ])

    setEmergencyData([
      { week: 'S40', emergency: 1100, sos: 2200, predicted: 1150 },
      { week: 'S41', emergency: 1250, sos: 2350, predicted: 1200 },
      { week: 'S42', emergency: 1400, sos: 2450, predicted: 1350 },
      { week: 'S43', emergency: 1550, sos: 2600, predicted: 1500 },
      { week: 'S44', emergency: 1700, sos: 2800, predicted: 1650 },
      { week: 'S45', emergency: 1850, sos: 3000, predicted: 1800 },
      { week: 'S46', emergency: 2000, sos: 3200, predicted: 1950 },
      { week: 'S47', emergency: 2200, sos: 3400, predicted: 2100 },
    ])
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case 'critical': return <AlertCircle className="h-5 w-5 text-red-500" />
      default: return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

    const pieData = [
      { name: 'Objectif atteint (>=75%)', value: 12, color: '#10B981' },
      { name: 'En progression (60-74%)', value: 45, color: '#F59E0B' },
      { name: 'Critique (<60%)', value: 43, color: '#EF4444' },
    ]

    return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="animate-fade-in-up">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Vue d&apos;ensemble
              </h1>
            <p className="text-gray-600 mt-2 text-sm">Suivi global de la campagne de vaccination grippe</p>
          </div>
          <div className="flex space-x-4 animate-slide-in-right">
            <Button className="btn-primary">
              <Download className="h-4 w-4 mr-2" />
              Exporter les données
            </Button>
            <Button className="btn-secondary">
              <Settings className="h-4 w-4 mr-2" />
              Paramètres
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Couverture Nationale"
            value="68.5%"
            change={{ value: "+1.8% vs semaine dernière", type: 'increase' }}
            icon={Target}
            description="Objectif national : 75%"
          />
          <MetricCard
            title="Doses Administrées"
            value="1.28M"
            icon={Activity}
            description="Cette semaine"
          />
          <MetricCard
            title="Objectif vs Réalisé"
            value="85.3%"
            change={{ value: "-14.7% vs objectif", type: 'decrease' }}
            icon={Target}
          />
          <MetricCard
            title="Départements Critiques"
            value="43"
            icon={AlertCircle}
            description="Sur 99 départements"
          />
        </div>

        {/* Department Frames */}
        <DepartmentFrames data={coverageData} />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coverage Map */}
          <div className="lg:col-span-2">
            <FranceMap 
              data={coverageData} 
              selectedFilter={selectedFilter}
              showEmergencyData={showEmergencyData}
              onFilterChange={handleFilterChange}
              onToggleEmergency={handleToggleEmergency}
              onExportData={handleExportData}
              onCenterMap={handleCenterMap}
            />
          </div>
          
          {/* Map Controls */}
          <div className="lg:col-span-1">
            <MapControls
              data={coverageData}
              selectedFilter={selectedFilter}
              showEmergencyData={showEmergencyData}
              onFilterChange={handleFilterChange}
              onToggleEmergency={handleToggleEmergency}
              onExportData={handleExportData}
              onCenterMap={handleCenterMap}
            />
          </div>
        </div>

          {/* Department Status */}
          <Card>
            <CardHeader>
              <CardTitle>Statuts par département (Objectif national : 75%)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {coverageData.map((dept) => (
                  <div key={dept.code} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      {getStatusIcon(dept.status)}
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{dept.department}</p>
                        <p className="text-sm text-gray-500">Code: {dept.code}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{dept.coverage}%</p>
                      <p className="text-sm text-gray-500">Objectif: {dept.target}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Forecast vs Reality */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Prévision vs Réalité (8 semaines)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={campaignData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line 
                    type="monotone" 
                    dataKey="doses" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    name="Doses administrées"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#EF4444" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Objectif"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Répartition des Statuts</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
    </div>

        {/* Emergency Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle>Surveillance des Urgences</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={emergencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <RechartsTooltip />
                <Line 
                  type="monotone" 
                  dataKey="emergency" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  name="Urgences observées"
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Urgences prévues"
                />
                <Line 
                  type="monotone" 
                  dataKey="sos" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  name="SOS Médecins"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </DashboardLayout>
  )
}