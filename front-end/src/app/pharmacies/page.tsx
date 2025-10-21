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
  Cell
} from 'recharts'
import { 
  Package, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  TrendingDown,
  Truck,
  Warehouse,
  Calculator,
  Settings
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '@/components/ui/metrics'
import { StatusBadge } from '@/components/ui/metrics'
import DashboardLayout from '@/components/dashboard-layout'

interface PharmacyData {
  department: string
  stockDispo: number
  previsionDemande: number
  joursCouverture: number
  statut: 'good' | 'warning' | 'critical'
  pharmacies: number
  capacite: number
}

interface StockData {
  week: string
  livrees: number
  consommees: number
  stock: number
}

interface DeliveryData {
  day: string
  deliveries: number
  consumption: number
  efficiency: number
}

interface AlertZone {
  department: string
  alertLevel: 'critical' | 'warning' | 'good'
  daysLeft: number
  action: string
}

export default function PharmaciesPage() {
  const [pharmacyData, setPharmacyData] = useState<PharmacyData[]>([])
  const [stockData, setStockData] = useState<StockData[]>([])
  const [deliveryData, setDeliveryData] = useState<DeliveryData[]>([])
  const [alertZones, setAlertZones] = useState<AlertZone[]>([])

  useEffect(() => {
    // Mock data for pharmacy tracking
    setPharmacyData([
      { 
        department: 'Paris', 
        stockDispo: 45000, 
        previsionDemande: 52000, 
        joursCouverture: 8.6, 
        statut: 'warning',
        pharmacies: 1250,
        capacite: 95
      },
      { 
        department: 'Lyon', 
        stockDispo: 28000, 
        previsionDemande: 35000, 
        joursCouverture: 6.2, 
        statut: 'critical',
        pharmacies: 680,
        capacite: 110
      },
      { 
        department: 'Marseille', 
        stockDispo: 52000, 
        previsionDemande: 48000, 
        joursCouverture: 12.1, 
        statut: 'good',
        pharmacies: 890,
        capacite: 78
      },
      { 
        department: 'Toulouse', 
        stockDispo: 32000, 
        previsionDemande: 38000, 
        joursCouverture: 7.4, 
        statut: 'warning',
        pharmacies: 720,
        capacite: 92
      },
      { 
        department: 'Nice', 
        stockDispo: 18000, 
        previsionDemande: 28000, 
        joursCouverture: 4.8, 
        statut: 'critical',
        pharmacies: 450,
        capacite: 125
      },
    ])

    setStockData([
      { week: 'S40', livrees: 1200000, consommees: 1100000, stock: 450000 },
      { week: 'S41', livrees: 1350000, consommees: 1250000, stock: 550000 },
      { week: 'S42', livrees: 1280000, consommees: 1380000, stock: 450000 },
      { week: 'S43', livrees: 1420000, consommees: 1450000, stock: 420000 },
      { week: 'S44', livrees: 1380000, consommees: 1520000, stock: 280000 },
      { week: 'S45', livrees: 1450000, consommees: 1480000, stock: 250000 },
      { week: 'S46', livrees: 1320000, consommees: 1420000, stock: 150000 },
      { week: 'S47', livrees: 1280000, consommees: 1350000, stock: 230000 },
    ])

    setDeliveryData([
      { day: 'Lun', deliveries: 45, consumption: 38, efficiency: 84 },
      { day: 'Mar', deliveries: 52, consumption: 45, efficiency: 87 },
      { day: 'Mer', deliveries: 48, consumption: 42, efficiency: 88 },
      { day: 'Jeu', deliveries: 55, consumption: 48, efficiency: 87 },
      { day: 'Ven', deliveries: 58, consumption: 52, efficiency: 90 },
      { day: 'Sam', deliveries: 35, consumption: 28, efficiency: 80 },
      { day: 'Dim', deliveries: 25, consumption: 18, efficiency: 72 },
    ])

    setAlertZones([
      { department: 'Nice', alertLevel: 'critical', daysLeft: 3, action: 'Livraison urgente' },
      { department: 'Lyon', alertLevel: 'critical', daysLeft: 4, action: 'Réapprovisionnement' },
      { department: 'Toulouse', alertLevel: 'warning', daysLeft: 6, action: 'Surveillance' },
      { department: 'Paris', alertLevel: 'warning', daysLeft: 7, action: 'Planification' },
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

  const pieData = [
    { name: 'Stock suffisant', value: 35, color: '#10B981' },
    { name: 'Surveillance', value: 28, color: '#F59E0B' },
    { name: 'Rupture imminente', value: 37, color: '#EF4444' },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pharmacies et Logistique</h1>
            <p className="text-gray-600 mt-1">Approvisionnement et gestion des risques de rupture</p>
          </div>
          <div className="flex space-x-4">
            <Button>
              <Calculator className="h-4 w-4 mr-2" />
              Planifier livraisons
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Alertes
            </Button>
          </div>
        </div>

        {/* Key KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Zones sous 5 jours"
            value="37%"
            change={{ value: "+5% vs semaine dernière", type: 'increase' }}
            icon={AlertTriangle}
          />
          <MetricCard
            title="Taux de rupture"
            value="2.3%"
            change={{ value: "-0.8% vs semaine dernière", type: 'decrease' }}
            icon={Package}
          />
          <MetricCard
            title="Ratio livrées/admin"
            value="94.8%"
            change={{ value: "+2.1% vs semaine dernière", type: 'increase' }}
            icon={Truck}
          />
          <MetricCard
            title="Stock national"
            value="230K"
            icon={Warehouse}
            description="6.2 jours de couverture"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pharmacy Tracking Table */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Suivi des Départements</CardTitle>
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
                        Stock Dispo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prévision Demande
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Jours Couverture
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pharmacies
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pharmacyData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.stockDispo.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.previsionDemande.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <StatusBadge status={item.joursCouverture < 5 ? 'critical' : item.joursCouverture < 8 ? 'warning' : 'good'}>
                            {item.joursCouverture} jours
                          </StatusBadge>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.pharmacies} ({item.capacite}%)
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Alert Zones */}
          <Card>
            <CardHeader>
              <CardTitle>Zones en Alerte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alertZones.map((zone, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${
                    zone.alertLevel === 'critical' ? 'bg-red-50 border-red-200' :
                    zone.alertLevel === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{zone.department}</p>
                        <p className="text-sm text-gray-600">{zone.action}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${
                          zone.alertLevel === 'critical' ? 'text-red-600' :
                          zone.alertLevel === 'warning' ? 'text-yellow-600' :
                          'text-gray-600'
                        }`}>
                          {zone.daysLeft} jours
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Répartition des Alertes</h4>
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
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stock Management Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Stocks</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="livrees" fill="#3B82F6" name="Livrées" />
                  <Bar dataKey="consommees" fill="#EF4444" name="Consommées" />
                  <Bar dataKey="stock" fill="#10B981" name="Stock" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Delivery Efficiency */}
          <Card>
            <CardHeader>
              <CardTitle>Efficacité des Livraisons</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={deliveryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="deliveries" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    name="Livraisons"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="#EF4444" 
                    strokeWidth={2}
                    name="Consommation"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    name="Efficacité %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Expiration Tracking */}
        <Card>
          <CardHeader>
            <CardTitle>Suivi des Lots - Proches de Péremption</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Lots expirant dans 7 jours</p>
                    <p className="text-2xl font-bold text-red-600">12</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Lots expirant dans 14 jours</p>
                    <p className="text-2xl font-bold text-yellow-600">28</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Lots en bon état</p>
                    <p className="text-2xl font-bold text-green-600">156</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
