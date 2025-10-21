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
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Area,
  AreaChart
} from 'recharts'
import { 
  Users, 
  MapPin, 
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Target,
  Activity,
  Shield,
  Award,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '@/components/ui/metrics'
import { StatusBadge } from '@/components/ui/metrics'
import DashboardLayout from '@/components/dashboard-layout'

interface EquityData {
  department: string
  couverture: number
  ias: number
  densite: number
  population: number
  vacGap: number
  cluster: string
  vulnerabilite: string
}

interface ClusteringData {
  cluster: string
  count: number
  avgCoverage: number
  avgIAS: number
  color: string
}

interface VulnerabilityData {
  department: string
  vulnerabilite: number
  facteurs: string[]
  recommandations: string[]
  priorite: 'Critical' | 'High' | 'Medium' | 'Low'
}

interface RegionalComparison {
  region: string
  couverture: number
  objectif: number
  ecart: number
  population: number
}

interface VacGapData {
  department: string
  vacGap: number
  status: 'critical' | 'warning' | 'good'
}

export default function EquityPage() {
  const [equityData, setEquityData] = useState<EquityData[]>([])
  const [clusteringData, setClusteringData] = useState<ClusteringData[]>([])
  const [vulnerabilityData, setVulnerabilityData] = useState<VulnerabilityData[]>([])
  const [regionalComparison, setRegionalComparison] = useState<RegionalComparison[]>([])
  const [vacGapData, setVacGapData] = useState<VacGapData[]>([])

  useEffect(() => {
    // Mock data for equity analysis
    setEquityData([
      { 
        department: 'Paris', 
        couverture: 65.2, 
        ias: 0.85, 
        densite: 12000, 
        population: 12000000,
        vacGap: -9.8,
        cluster: 'Urban High',
        vulnerabilite: 'Medium'
      },
      { 
        department: 'Lyon', 
        couverture: 58.7, 
        ias: 0.72, 
        densite: 4500, 
        population: 1800000,
        vacGap: -16.3,
        cluster: 'Urban Medium',
        vulnerabilite: 'High'
      },
      { 
        department: 'Marseille', 
        couverture: 72.1, 
        ias: 0.68, 
        densite: 3800, 
        population: 2000000,
        vacGap: -2.9,
        cluster: 'Urban High',
        vulnerabilite: 'Low'
      },
      { 
        department: 'Toulouse', 
        couverture: 68.9, 
        ias: 0.75, 
        densite: 3200, 
        population: 1500000,
        vacGap: -6.1,
        cluster: 'Urban Medium',
        vulnerabilite: 'Medium'
      },
      { 
        department: 'Nice', 
        couverture: 54.3, 
        ias: 0.62, 
        densite: 2800, 
        population: 1100000,
        vacGap: -20.7,
        cluster: 'Rural High',
        vulnerabilite: 'Critical'
      },
      { 
        department: 'Bordeaux', 
        couverture: 71.5, 
        ias: 0.78, 
        densite: 2100, 
        population: 1600000,
        vacGap: -3.5,
        cluster: 'Urban Medium',
        vulnerabilite: 'Low'
      },
      { 
        department: 'Nantes', 
        couverture: 69.8, 
        ias: 0.81, 
        densite: 1900, 
        population: 1400000,
        vacGap: -5.2,
        cluster: 'Urban Medium',
        vulnerabilite: 'Medium'
      },
      { 
        department: 'Strasbourg', 
        couverture: 66.4, 
        ias: 0.76, 
        densite: 2400, 
        population: 1200000,
        vacGap: -8.6,
        cluster: 'Urban Medium',
        vulnerabilite: 'Medium'
      },
    ])

    setClusteringData([
      { cluster: 'Urban High', count: 12, avgCoverage: 68.5, avgIAS: 0.82, color: '#3B82F6' },
      { cluster: 'Urban Medium', count: 25, avgCoverage: 65.2, avgIAS: 0.75, color: '#10B981' },
      { cluster: 'Rural High', count: 18, avgCoverage: 58.7, avgIAS: 0.68, color: '#F59E0B' },
      { cluster: 'Rural Medium', count: 28, avgCoverage: 52.3, avgIAS: 0.61, color: '#EF4444' },
      { cluster: 'Rural Low', count: 16, avgCoverage: 45.8, avgIAS: 0.54, color: '#8B5CF6' },
    ])

    setVulnerabilityData([
      { 
        department: 'Nice', 
        vulnerabilite: 85, 
        facteurs: ['Densité faible', 'IAS élevé', 'Couverture faible'],
        recommandations: ['Déploiement équipes mobiles', 'Campagne ciblée'],
        priorite: 'Critical'
      },
      { 
        department: 'Lyon', 
        vulnerabilite: 72, 
        facteurs: ['Population âgée', 'Couverture insuffisante'],
        recommandations: ['Renforcement pharmacies', 'Formation personnel'],
        priorite: 'High'
      },
      { 
        department: 'Toulouse', 
        vulnerabilite: 58, 
        facteurs: ['IAS moyen', 'Couverture correcte'],
        recommandations: ['Surveillance continue'],
        priorite: 'Medium'
      },
      { 
        department: 'Paris', 
        vulnerabilite: 45, 
        facteurs: ['Infrastructure solide'],
        recommandations: ['Optimisation existante'],
        priorite: 'Low'
      },
    ])

    setRegionalComparison([
      { region: 'Île-de-France', couverture: 65.2, objectif: 75, ecart: -9.8, population: 12000000 },
      { region: 'Auvergne-Rhône-Alpes', couverture: 58.7, objectif: 75, ecart: -16.3, population: 8000000 },
      { region: 'Provence-Alpes-Côte d\'Azur', couverture: 54.3, objectif: 75, ecart: -20.7, population: 5000000 },
      { region: 'Occitanie', couverture: 68.9, objectif: 75, ecart: -6.1, population: 6000000 },
      { region: 'Nouvelle-Aquitaine', couverture: 71.5, objectif: 75, ecart: -3.5, population: 6000000 },
      { region: 'Pays de la Loire', couverture: 69.8, objectif: 75, ecart: -5.2, population: 3800000 },
      { region: 'Grand Est', couverture: 66.4, objectif: 75, ecart: -8.6, population: 5500000 },
    ])

    setVacGapData([
      { department: 'Nice', vacGap: -20.7, status: 'critical' },
      { department: 'Lyon', vacGap: -16.3, status: 'critical' },
      { department: 'Strasbourg', vacGap: -8.6, status: 'warning' },
      { department: 'Paris', vacGap: -9.8, status: 'warning' },
      { department: 'Toulouse', vacGap: -6.1, status: 'warning' },
      { department: 'Nantes', vacGap: -5.2, status: 'warning' },
      { department: 'Bordeaux', vacGap: -3.5, status: 'good' },
      { department: 'Marseille', vacGap: -2.9, status: 'good' },
    ])
  }, [])

  const getVulnerabilityIcon = (level: string) => {
    switch (level) {
      case 'Critical': return <AlertTriangle className="h-5 w-5 text-red-500" />
      case 'High': return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case 'Medium': return <Activity className="h-5 w-5 text-yellow-500" />
      case 'Low': return <CheckCircle className="h-5 w-5 text-green-500" />
      default: return <Activity className="h-5 w-5 text-gray-500" />
    }
  }

  const getVacGapIcon = (gap: number) => {
    if (gap <= -15) return <AlertTriangle className="h-5 w-5 text-red-500" />
    if (gap <= -10) return <AlertTriangle className="h-5 w-5 text-orange-500" />
    if (gap <= -5) return <Activity className="h-5 w-5 text-yellow-500" />
    return <CheckCircle className="h-5 w-5 text-green-500" />
  }

  const pieData = [
    { name: 'Urban High', value: 12, color: '#3B82F6' },
    { name: 'Urban Medium', value: 25, color: '#10B981' },
    { name: 'Rural High', value: 18, color: '#F59E0B' },
    { name: 'Rural Medium', value: 28, color: '#EF4444' },
    { name: 'Rural Low', value: 16, color: '#8B5CF6' },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Équité et Analyse Territoriale</h1>
            <p className="text-gray-600 mt-1">Vision stratégique - Analyse des disparités et vulnérabilités</p>
          </div>
          <div className="flex space-x-4">
            <Button>
              <Shield className="h-4 w-4 mr-2" />
              Plan équité
            </Button>
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Rapport détaillé
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Écart Moyen VacGap"
            value="-9.2%"
            change={{ value: "Sous objectif régional", type: 'decrease' }}
            icon={Target}
          />
          <MetricCard
            title="Zones Vulnérables"
            value="43"
            icon={MapPin}
            description="Sur 99 départements"
          />
          <MetricCard
            title="Clusters Identifiés"
            value="5"
            icon={PieChartIcon}
            description="Profils territoriaux"
          />
          <MetricCard
            title="Population Atteinte"
            value="6.5M"
            icon={Users}
            description="Personnes supplémentaires"
          />
        </div>

        {/* Main Analysis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coverage vs IAS vs Density */}
          <Card>
            <CardHeader>
              <CardTitle>Couverture vs IAS vs Densité</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={equityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ias" name="IAS" />
                  <YAxis dataKey="couverture" name="Couverture %" />
                  <Tooltip 
                    formatter={(value, name) => [value, name]}
                    labelFormatter={(label) => `IAS: ${label}`}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-white p-3 border rounded shadow-lg">
                            <p className="font-medium">{data.department}</p>
                            <p className="text-sm">Couverture: {data.couverture}%</p>
                            <p className="text-sm">IAS: {data.ias}</p>
                            <p className="text-sm">Densité: {data.densite.toLocaleString()}/km²</p>
                            <p className="text-sm">VacGap: {data.vacGap}%</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Scatter 
                    dataKey="couverture" 
                    fill="#3B82F6"
                    name="Couverture"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Clustering Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Profil des Zones (Clustering)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
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
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {clusteringData.map((cluster, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: cluster.color }}
                      ></div>
                      <span className="text-sm font-medium">{cluster.cluster}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{cluster.count} départements</p>
                      <p className="text-xs text-gray-500">Couverture: {cluster.avgCoverage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vulnerability Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Classement des Zones Vulnérables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                {vulnerabilityData.map((zone, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    zone.priorite === 'Critical' ? 'bg-red-50 border-red-200' :
                    zone.priorite === 'High' ? 'bg-orange-50 border-orange-200' :
                    zone.priorite === 'Medium' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {getVulnerabilityIcon(zone.priorite)}
                        <h4 className="ml-2 font-medium">{zone.department}</h4>
                      </div>
                      <span className="text-2xl font-bold">{zone.vulnerabilite}%</span>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm text-gray-600 mb-1">Facteurs de vulnérabilité:</p>
                      <div className="flex flex-wrap gap-1">
                        {zone.facteurs.map((facteur, idx) => (
                          <StatusBadge key={idx} status="info">
                            {facteur}
                          </StatusBadge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Recommandations:</p>
                      <div className="flex flex-wrap gap-1">
                        {zone.recommandations.map((rec, idx) => (
                          <StatusBadge key={idx} status="good">
                            {rec}
                          </StatusBadge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">Distribution de la Vulnérabilité</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={vulnerabilityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="vulnerabilite" fill="#EF4444" name="Vulnérabilité %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* VacGap Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* VacGap Ranking */}
          <Card>
            <CardHeader>
              <CardTitle>Indicateur VacGap par Département</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {vacGapData.map((item, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${
                    item.vacGap <= -15 ? 'bg-red-50 border-red-200' :
                    item.vacGap <= -10 ? 'bg-orange-50 border-orange-200' :
                    item.vacGap <= -5 ? 'bg-yellow-50 border-yellow-200' :
                    'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getVacGapIcon(item.vacGap)}
                        <span className="ml-2 font-medium">{item.department}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{item.vacGap}%</p>
                        <p className="text-xs text-gray-500">
                          {item.status === 'critical' ? 'Critique' :
                           item.status === 'warning' ? 'Attention' : 'Correct'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Regional Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Comparaison Régionale</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={regionalComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="couverture" fill="#3B82F6" name="Couverture %" />
                  <Bar dataKey="objectif" fill="#10B981" name="Objectif %" />
                  <Line 
                    type="monotone" 
                    dataKey="ecart" 
                    stroke="#EF4444" 
                    strokeWidth={2}
                    name="Écart %"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Best Practices and Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Bonnes Pratiques & Recommandations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <h4 className="font-medium text-green-800">Zones Performantes</h4>
                </div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Marseille: Couverture 72.1%</li>
                  <li>• Bordeaux: Couverture 71.5%</li>
                  <li>• Nantes: Couverture 69.8%</li>
                </ul>
                <p className="text-xs text-green-600 mt-2">
                  Facteurs clés: Infrastructure solide, densité optimale
                </p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                  <h4 className="font-medium text-yellow-800">Zones à Surveiller</h4>
                </div>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Toulouse: VacGap -6.1%</li>
                  <li>• Strasbourg: VacGap -8.6%</li>
                  <li>• Paris: VacGap -9.8%</li>
                </ul>
                <p className="text-xs text-yellow-600 mt-2">
                  Actions: Optimisation des flux, formation
                </p>
              </div>

              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  <h4 className="font-medium text-red-800">Zones Prioritaires</h4>
                </div>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Nice: VacGap -20.7%</li>
                  <li>• Lyon: VacGap -16.3%</li>
                  <li>• Déploiement urgent requis</li>
                </ul>
                <p className="text-xs text-red-600 mt-2">
                  Actions: Équipes mobiles, campagnes ciblées
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard
            title="Équité Territoriale"
            value="68%"
            change={{ value: "+5% vs année dernière", type: 'increase' }}
            icon={Award}
          />
          <MetricCard
            title="Zones Optimisées"
            value="56"
            icon={Shield}
            description="Sur 99 départements"
          />
          <MetricCard
            title="Investissement Équité"
            value="4.2M€"
            icon={Target}
            description="Budget alloué"
          />
          <MetricCard
            title="ROI Équité"
            value="420%"
            change={{ value: "Retour sur investissement", type: 'increase' }}
            icon={TrendingUp}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
