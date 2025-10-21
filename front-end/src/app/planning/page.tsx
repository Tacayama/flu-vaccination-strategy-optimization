'use client'

import { useState, useEffect } from 'react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter
} from 'recharts'
import { 
  Calendar, 
  Users, 
  Package, 
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Target,
  Zap,
  Settings,
  Calculator,
  MapPin,
  Clock,
  Activity
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '@/components/ui/metrics'
import { StatusBadge } from '@/components/ui/metrics'
import DashboardLayout from '@/components/dashboard-layout'

interface DepartmentData {
  department: string
  previsionDoses: number
  stockActuel: number
  joursCouverture: number
  besoinComplementaire: number
  statut: 'good' | 'warning' | 'critical'
  population: number
  couvertureActuelle: number
  objectif: number
}

interface StockData {
  week: string
  stockNational: number
  demandeTotale: number
  ratio: number
}

interface ResourceData {
  department: string
  demandePrevue: number
  capaciteActuelle: number
  equipesNecessaires: number
  tauxOccupation: number
  alerte: 'good' | 'warning' | 'critical'
}

interface ScenarioData {
  scenario: string
  doses: number
  equipes: number
  couverture: number
  cout: number
}

interface Recommendation {
  priority: 'high' | 'medium' | 'low'
  action: string
  impact: string
  cost: number
  timeline: string
}

export default function PlanningPage() {
  const [departmentData, setDepartmentData] = useState<DepartmentData[]>([])
  const [stockData, setStockData] = useState<StockData[]>([])
  const [resourceData, setResourceData] = useState<ResourceData[]>([])
  const [scenarioData, setScenarioData] = useState<ScenarioData[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [whatIfParams, setWhatIfParams] = useState({
    dosesAvailable: 100,
    teamsAvailable: 100,
    budgetMultiplier: 1.0
  })

  useEffect(() => {
    // Mock data for planning and resources
    setDepartmentData([
      { 
        department: 'Paris', 
        previsionDoses: 52000, 
        stockActuel: 45000, 
        joursCouverture: 8.6, 
        besoinComplementaire: 7000,
        statut: 'warning',
        population: 12000000,
        couvertureActuelle: 65.2,
        objectif: 75
      },
      { 
        department: 'Lyon', 
        previsionDoses: 35000, 
        stockActuel: 28000, 
        joursCouverture: 6.2, 
        besoinComplementaire: 7000,
        statut: 'critical',
        population: 1800000,
        couvertureActuelle: 58.7,
        objectif: 75
      },
      { 
        department: 'Marseille', 
        previsionDoses: 48000, 
        stockActuel: 52000, 
        joursCouverture: 12.1, 
        besoinComplementaire: -4000,
        statut: 'good',
        population: 2000000,
        couvertureActuelle: 72.1,
        objectif: 75
      },
      { 
        department: 'Toulouse', 
        previsionDoses: 38000, 
        stockActuel: 32000, 
        joursCouverture: 7.4, 
        besoinComplementaire: 6000,
        statut: 'warning',
        population: 1500000,
        couvertureActuelle: 68.9,
        objectif: 75
      },
      { 
        department: 'Nice', 
        previsionDoses: 28000, 
        stockActuel: 18000, 
        joursCouverture: 4.8, 
        besoinComplementaire: 10000,
        statut: 'critical',
        population: 1100000,
        couvertureActuelle: 54.3,
        objectif: 75
      },
    ])

    setStockData([
      { week: 'S40', stockNational: 450000, demandeTotale: 420000, ratio: 1.07 },
      { week: 'S41', stockNational: 550000, demandeTotale: 450000, ratio: 1.22 },
      { week: 'S42', stockNational: 450000, demandeTotale: 480000, ratio: 0.94 },
      { week: 'S43', stockNational: 420000, demandeTotale: 520000, ratio: 0.81 },
      { week: 'S44', stockNational: 280000, demandeTotale: 550000, ratio: 0.51 },
      { week: 'S45', stockNational: 250000, demandeTotale: 480000, ratio: 0.52 },
      { week: 'S46', stockNational: 150000, demandeTotale: 420000, ratio: 0.36 },
      { week: 'S47', stockNational: 230000, demandeTotale: 380000, ratio: 0.61 },
    ])

    setResourceData([
      { 
        department: 'Paris', 
        demandePrevue: 1250, 
        capaciteActuelle: 1200, 
        equipesNecessaires: 5, 
        tauxOccupation: 104,
        alerte: 'warning'
      },
      { 
        department: 'Lyon', 
        demandePrevue: 850, 
        capaciteActuelle: 750, 
        equipesNecessaires: 3, 
        tauxOccupation: 113,
        alerte: 'critical'
      },
      { 
        department: 'Marseille', 
        demandePrevue: 950, 
        capaciteActuelle: 1100, 
        equipesNecessaires: 0, 
        tauxOccupation: 86,
        alerte: 'good'
      },
      { 
        department: 'Toulouse', 
        demandePrevue: 720, 
        capaciteActuelle: 680, 
        equipesNecessaires: 2, 
        tauxOccupation: 106,
        alerte: 'warning'
      },
      { 
        department: 'Nice', 
        demandePrevue: 680, 
        capaciteActuelle: 520, 
        equipesNecessaires: 4, 
        tauxOccupation: 131,
        alerte: 'critical'
      },
    ])

    setScenarioData([
      { scenario: 'Optimiste', doses: 120, equipes: 120, couverture: 78, cout: 15.2 },
      { scenario: 'Réaliste', doses: 100, equipes: 100, couverture: 72, cout: 12.8 },
      { scenario: 'Pessimiste', doses: 80, equipes: 80, couverture: 65, cout: 10.5 },
      { scenario: 'Actuel', doses: 85, equipes: 90, couverture: 68, cout: 11.2 },
    ])

    setRecommendations([
      { 
        priority: 'high', 
        action: 'Réapprovisionner Nice et Lyon', 
        impact: 'Éviter rupture de stock',
        cost: 2.5,
        timeline: '3 jours'
      },
      { 
        priority: 'medium', 
        action: 'Déployer 2 équipes supplémentaires à Toulouse', 
        impact: 'Réduire taux occupation',
        cost: 0.8,
        timeline: '1 semaine'
      },
      { 
        priority: 'high', 
        action: 'Optimiser distribution Paris', 
        impact: 'Améliorer efficacité',
        cost: 1.2,
        timeline: '2 semaines'
      },
      { 
        priority: 'low', 
        action: 'Formation équipes Marseille', 
        impact: 'Maintenir performance',
        cost: 0.3,
        timeline: '1 mois'
      },
    ])
  }, [])

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'good': return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-500" />
      default: return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const handleWhatIfChange = (param: string, value: number) => {
    setWhatIfParams(prev => ({
      ...prev,
      [param]: value
    }))
  }

  const calculateWhatIfImpact = () => {
    const baseCoverage = 68
    const baseCost = 11.2
    const dosesImpact = (whatIfParams.dosesAvailable - 100) * 0.1
    const teamsImpact = (whatIfParams.teamsAvailable - 100) * 0.05
    const budgetImpact = (whatIfParams.budgetMultiplier - 1) * 0.2
    
    return {
      coverage: Math.max(0, Math.min(100, baseCoverage + dosesImpact + teamsImpact)),
      cost: baseCost * whatIfParams.budgetMultiplier,
      efficiency: Math.max(0, Math.min(100, 85 + dosesImpact + teamsImpact))
    }
  }

  const whatIfImpact = calculateWhatIfImpact()

  const pieData = [
    { name: 'Stock suffisant', value: 20, color: '#10B981' },
    { name: 'Surveillance', value: 40, color: '#F59E0B' },
    { name: 'Réapprovisionnement', value: 40, color: '#EF4444' },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Planification & Ressources</h1>
            <p className="text-gray-600 mt-1">Cœur de la décision - Ajustement et allocation des ressources</p>
          </div>
          <div className="flex space-x-4">
            <Button>
              <Calculator className="h-4 w-4 mr-2" />
              Optimiser allocation
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Paramètres
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Stock National"
            value="230K"
            change={{ value: "-15% vs semaine dernière", type: 'decrease' }}
            icon={Package}
          />
          <MetricCard
            title="Départements Critiques"
            value="2"
            icon={MapPin}
            description="Nice, Lyon"
          />
          <MetricCard
            title="Équipes Disponibles"
            value="90"
            change={{ value: "+5 vs semaine dernière", type: 'increase' }}
            icon={Users}
          />
          <MetricCard
            title="Budget Alloué"
            value="11.2M€"
            icon={Target}
            description="Utilisé: 78%"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Department Summary */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Synthèse par Département</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Département
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prévision Doses
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock Actuel
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Jours Couverture
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Besoin Complémentaire
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {departmentData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.previsionDoses.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.stockActuel.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <StatusBadge status={item.joursCouverture < 5 ? 'critical' : item.joursCouverture < 8 ? 'warning' : 'good'}>
                            {item.joursCouverture} jours
                          </StatusBadge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className={`font-medium ${
                            item.besoinComplementaire > 0 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {item.besoinComplementaire > 0 ? '+' : ''}{item.besoinComplementaire.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(item.statut)}
                            <StatusBadge status={item.statut} className="ml-2">
                              {item.statut === 'good' ? 'OK' : 
                               item.statut === 'warning' ? 'Tendu' : 'Critique'}
                            </StatusBadge>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Répartition des Statuts</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
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

        {/* Resource Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Resource Management */}
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Ressources Humaines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resourceData.map((resource, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    resource.alerte === 'critical' ? 'bg-red-50 border-red-200' :
                    resource.alerte === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{resource.department}</h4>
                      <StatusBadge status={resource.tauxOccupation > 110 ? 'critical' : resource.tauxOccupation > 100 ? 'warning' : 'good'}>
                        {resource.tauxOccupation}% occupation
                      </StatusBadge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Demande prévue:</p>
                        <p className="font-medium">{resource.demandePrevue} actes/semaine</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Capacité actuelle:</p>
                        <p className="font-medium">{resource.capaciteActuelle} actes/semaine</p>
                      </div>
                    </div>
                    {resource.equipesNecessaires > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-red-600">
                          ⚠️ {resource.equipesNecessaires} équipe(s) supplémentaire(s) nécessaire(s)
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stock Management */}
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Stocks Nationaux</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="stockNational" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    name="Stock national"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="demandeTotale" 
                    stroke="#EF4444" 
                    strokeWidth={2}
                    name="Demande totale"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Ratio moyen</p>
                  <p className="text-2xl font-bold text-gray-900">0.76</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Tendance</p>
                  <p className="text-2xl font-bold text-red-600">↓ Déclin</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What-If Scenarios */}
        <Card>
          <CardHeader>
            <CardTitle>Scénarios "What-If"</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Controls */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doses disponibles (%)
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={whatIfParams.dosesAvailable}
                    onChange={(e) => handleWhatIfChange('dosesAvailable', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>50%</span>
                    <span className="font-medium">{whatIfParams.dosesAvailable}%</span>
                    <span>150%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Équipes disponibles (%)
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={whatIfParams.teamsAvailable}
                    onChange={(e) => handleWhatIfChange('teamsAvailable', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>50%</span>
                    <span className="font-medium">{whatIfParams.teamsAvailable}%</span>
                    <span>150%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Multiplicateur budget
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={whatIfParams.budgetMultiplier}
                    onChange={(e) => handleWhatIfChange('budgetMultiplier', parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0.5x</span>
                    <span className="font-medium">{whatIfParams.budgetMultiplier.toFixed(1)}x</span>
                    <span>2.0x</span>
                  </div>
                </div>
              </div>

              {/* Impact Visualization */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Couverture prévue</p>
                    <p className="text-2xl font-bold text-blue-600">{whatIfImpact.coverage.toFixed(1)}%</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Efficacité</p>
                    <p className="text-2xl font-bold text-green-600">{whatIfImpact.efficiency.toFixed(1)}%</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Coût estimé</p>
                    <p className="text-2xl font-bold text-purple-600">{whatIfImpact.cost.toFixed(1)}M€</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <ScatterChart data={scenarioData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="doses" name="Doses (%)" />
                    <YAxis dataKey="couverture" name="Couverture (%)" />
                    <Tooltip />
                    <Scatter dataKey="couverture" fill="#3B82F6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Recommandations Automatiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className={`p-4 rounded-lg border ${getPriorityColor(rec.priority)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{rec.action}</h4>
                    <StatusBadge status={rec.priority}>
                      {rec.priority === 'high' ? 'Priorité haute' :
                       rec.priority === 'medium' ? 'Priorité moyenne' : 'Priorité basse'}
                    </StatusBadge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Impact:</p>
                      <p className="font-medium">{rec.impact}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Coût:</p>
                      <p className="font-medium">{rec.cost}M€</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Délai:</p>
                      <p className="font-medium">{rec.timeline}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
