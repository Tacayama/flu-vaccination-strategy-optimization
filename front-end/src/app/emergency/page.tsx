'use client'

import { useState, useEffect } from 'react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  ReferenceLine
} from 'recharts'
import { 
  AlertTriangle, 
  Activity, 
  TrendingUp,
  TrendingDown,
  Clock,
  MapPin,
  Bell,
  Target,
  Zap,
  Settings
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '@/components/ui/metrics'
import { StatusBadge } from '@/components/ui/metrics'
import DashboardLayout from '@/components/dashboard-layout'

interface EmergencyData {
  week: string
  emergencyObserved: number
  emergencyPredicted: number
  sosObserved: number
  sosPredicted: number
  severityIndex: number
  isPeak: boolean
}

interface DepartmentRisk {
  department: string
  riskLevel: 'critical' | 'high' | 'medium' | 'low'
  emergencyRate: number
  sosRate: number
  trend: 'increasing' | 'decreasing' | 'stable'
  recommendation: string
  daysToPeak: number
}

interface ThresholdData {
  ageGroup: string
  threshold: number
  current: number
  status: 'normal' | 'exceeded'
}

interface SurveillanceZone {
  department: string
  alertLevel: 'critical' | 'high' | 'medium'
  emergencyExcess: number
  sosExcess: number
  action: string
  teams: number
}

export default function EmergencyPage() {
  const [emergencyData, setEmergencyData] = useState<EmergencyData[]>([])
  const [departmentRisk, setDepartmentRisk] = useState<DepartmentRisk[]>([])
  const [thresholdData, setThresholdData] = useState<ThresholdData[]>([])
  const [surveillanceZones, setSurveillanceZones] = useState<SurveillanceZone[]>([])

  useEffect(() => {
    // Mock data for emergency monitoring
    setEmergencyData([
      { 
        week: 'S40', 
        emergencyObserved: 450, 
        emergencyPredicted: 480, 
        sosObserved: 1200, 
        sosPredicted: 1250,
        severityIndex: 0.85,
        isPeak: false
      },
      { 
        week: 'S41', 
        emergencyObserved: 520, 
        emergencyPredicted: 510, 
        sosObserved: 1350, 
        sosPredicted: 1320,
        severityIndex: 0.92,
        isPeak: false
      },
      { 
        week: 'S42', 
        emergencyObserved: 680, 
        emergencyPredicted: 650, 
        sosObserved: 1680, 
        sosPredicted: 1650,
        severityIndex: 1.15,
        isPeak: true
      },
      { 
        week: 'S43', 
        emergencyObserved: 750, 
        emergencyPredicted: 720, 
        sosObserved: 1850, 
        sosPredicted: 1800,
        severityIndex: 1.28,
        isPeak: true
      },
      { 
        week: 'S44', 
        emergencyObserved: 820, 
        emergencyPredicted: 800, 
        sosObserved: 2100, 
        sosPredicted: 2050,
        severityIndex: 1.35,
        isPeak: true
      },
      { 
        week: 'S45', 
        emergencyObserved: 780, 
        emergencyPredicted: 760, 
        sosObserved: 1950, 
        sosPredicted: 1900,
        severityIndex: 1.22,
        isPeak: false
      },
      { 
        week: 'S46', 
        emergencyObserved: 650, 
        emergencyPredicted: 680, 
        sosObserved: 1650, 
        sosPredicted: 1700,
        severityIndex: 0.95,
        isPeak: false
      },
      { 
        week: 'S47', 
        emergencyObserved: 580, 
        emergencyPredicted: 600, 
        sosObserved: 1450, 
        sosPredicted: 1500,
        severityIndex: 0.88,
        isPeak: false
      },
    ])

    setDepartmentRisk([
      { 
        department: 'Paris', 
        riskLevel: 'high', 
        emergencyRate: 1250, 
        sosRate: 3200, 
        trend: 'increasing',
        recommendation: 'Renforcer surveillance',
        daysToPeak: 3
      },
      { 
        department: 'Lyon', 
        riskLevel: 'critical', 
        emergencyRate: 1450, 
        sosRate: 3800, 
        trend: 'increasing',
        recommendation: 'Alerte rouge - Mobilisation urgente',
        daysToPeak: 1
      },
      { 
        department: 'Marseille', 
        riskLevel: 'medium', 
        emergencyRate: 980, 
        sosRate: 2400, 
        trend: 'stable',
        recommendation: 'Surveillance normale',
        daysToPeak: 7
      },
      { 
        department: 'Toulouse', 
        riskLevel: 'high', 
        emergencyRate: 1100, 
        sosRate: 2800, 
        trend: 'increasing',
        recommendation: 'Préparer renforts',
        daysToPeak: 4
      },
      { 
        department: 'Nice', 
        riskLevel: 'critical', 
        emergencyRate: 1600, 
        sosRate: 4200, 
        trend: 'increasing',
        recommendation: 'Alerte maximale',
        daysToPeak: 0
      },
    ])

    setThresholdData([
      { ageGroup: '00-04 ans', threshold: 2000, current: 1850, status: 'normal' },
      { ageGroup: '05-14 ans', threshold: 1500, current: 1680, status: 'exceeded' },
      { ageGroup: '15-64 ans', threshold: 800, current: 750, status: 'normal' },
      { ageGroup: '65 ans ou plus', threshold: 1200, current: 1350, status: 'exceeded' },
      { ageGroup: 'Tous âges', threshold: 1000, current: 1150, status: 'exceeded' },
    ])

    setSurveillanceZones([
      { 
        department: 'Nice', 
        alertLevel: 'critical', 
        emergencyExcess: 33, 
        sosExcess: 25, 
        action: 'Mobilisation urgente',
        teams: 8
      },
      { 
        department: 'Lyon', 
        alertLevel: 'critical', 
        emergencyExcess: 28, 
        sosExcess: 22, 
        action: 'Renforts médicaux',
        teams: 6
      },
      { 
        department: 'Paris', 
        alertLevel: 'high', 
        emergencyExcess: 18, 
        sosExcess: 15, 
        action: 'Surveillance renforcée',
        teams: 4
      },
      { 
        department: 'Toulouse', 
        alertLevel: 'high', 
        emergencyExcess: 12, 
        sosExcess: 10, 
        action: 'Préparation renforts',
        teams: 3
      },
    ])
  }, [])

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-500" />
      case 'high': return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case 'medium': return <Activity className="h-5 w-5 text-yellow-500" />
      case 'low': return <Activity className="h-5 w-5 text-green-500" />
      default: return <Activity className="h-5 w-5 text-gray-500" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-red-500" />
      case 'decreasing': return <TrendingDown className="h-4 w-4 text-green-500" />
      case 'stable': return <Activity className="h-4 w-4 text-blue-500" />
      default: return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Urgences et Surveillance</h1>
            <p className="text-gray-600 mt-1">Anticipation des pics d'activité et surveillance médicale</p>
          </div>
          <div className="flex space-x-4">
            <Button className="bg-red-600 hover:bg-red-700">
              <Bell className="h-4 w-4 mr-2" />
              Alerte générale
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Paramètres seuils
            </Button>
          </div>
        </div>

        {/* Key KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Détection des pics"
            value="87.5%"
            change={{ value: "+5.2% vs mois dernier", type: 'increase' }}
            icon={Target}
          />
          <MetricCard
            title="Horizon anticipation"
            value="4.2"
            icon={Clock}
            description="jours en moyenne"
          />
          <MetricCard
            title="Écart prévision/réalité"
            value="5.8%"
            change={{ value: "-1.2% vs semaine dernière", type: 'decrease' }}
            icon={Activity}
          />
          <MetricCard
            title="Zones à surveiller"
            value="4"
            icon={MapPin}
            description="2 critiques"
          />
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Observed vs Predicted */}
          <Card>
            <CardHeader>
              <CardTitle>Observé vs Prévu - Urgences</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={emergencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="emergencyObserved" 
                    stroke="#EF4444" 
                    strokeWidth={3}
                    name="Urgences observées"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="emergencyPredicted" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Urgences prévues"
                  />
                  <ReferenceLine y={600} stroke="#F59E0B" strokeDasharray="3 3" label="Seuil d'alerte" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* SOS Médecins */}
          <Card>
            <CardHeader>
              <CardTitle>Observé vs Prévu - SOS Médecins</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={emergencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="sosObserved" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    name="SOS Médecins observés"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sosPredicted" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="SOS Médecins prévus"
                  />
                  <ReferenceLine y={2000} stroke="#F59E0B" strokeDasharray="3 3" label="Seuil d'alerte" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Department Risk Map and Thresholds */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Risk */}
          <Card>
            <CardHeader>
              <CardTitle>Départements à Risque</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {departmentRisk.map((dept, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    dept.riskLevel === 'critical' ? 'bg-red-50 border-red-200' :
                    dept.riskLevel === 'high' ? 'bg-orange-50 border-orange-200' :
                    dept.riskLevel === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {getRiskIcon(dept.riskLevel)}
                        <h4 className="ml-2 font-medium">{dept.department}</h4>
                      </div>
                      <div className="flex items-center">
                        {getTrendIcon(dept.trend)}
                        <span className="ml-1 text-sm">
                          {dept.daysToPeak === 0 ? 'Pic actuel' : `${dept.daysToPeak}j avant pic`}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Urgences:</p>
                        <p className="font-medium">{dept.emergencyRate}/100k</p>
                      </div>
                      <div>
                        <p className="text-gray-600">SOS Médecins:</p>
                        <p className="font-medium">{dept.sosRate}/100k</p>
                      </div>
                    </div>
                    <p className="text-sm mt-2 font-medium">{dept.recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Threshold Monitoring */}
          <Card>
            <CardHeader>
              <CardTitle>Dépassements de Seuils</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={thresholdData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="ageGroup" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="current" fill="#EF4444" name="Actuel" />
                  <Bar dataKey="threshold" fill="#3B82F6" name="Seuil" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {thresholdData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item.ageGroup}</span>
                    <StatusBadge status={item.status === 'exceeded' ? 'critical' : 'good'}>
                      {item.status === 'exceeded' ? 'Seuil dépassé' : 'Normal'}
                    </StatusBadge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Surveillance Zones */}
        <Card>
          <CardHeader>
            <CardTitle>Zones à Surveiller</CardTitle>
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
                      Niveau d'Alerte
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Excès Urgences
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Excès SOS
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action Recommandée
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Équipes Nécessaires
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {surveillanceZones.map((zone, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {zone.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={zone.alertLevel}>
                          {zone.alertLevel === 'critical' ? 'Critique' :
                           zone.alertLevel === 'high' ? 'Élevé' : 'Moyen'}
                        </StatusBadge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="text-red-600 font-medium">+{zone.emergencyExcess}%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="text-red-600 font-medium">+{zone.sosExcess}%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {zone.action}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <StatusBadge status="info">
                          {zone.teams} équipes
                        </StatusBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Severity Index */}
        <Card>
          <CardHeader>
            <CardTitle>Indice de Sévérité</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={emergencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="severityIndex" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  name="Indice de sévérité"
                />
                <ReferenceLine y={1.0} stroke="#EF4444" strokeDasharray="3 3" label="Seuil critique" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 flex justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                <span className="text-sm text-gray-600">&lt; 1.0 - Normal</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                <span className="text-sm text-gray-600">1.0-1.2 - Surveillance</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                <span className="text-sm text-gray-600">&gt; 1.2 - Critique</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
