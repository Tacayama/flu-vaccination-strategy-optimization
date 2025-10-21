// Data integration utilities for vaccination dashboard
import { formatNumber, formatPercentage, formatCurrency } from './utils'

export interface VaccinationData {
  week: string
  department: string
  coverage: number
  doses: number
  target: number
  population: number
  emergencyRate: number
  sosRate: number
  stock: number
  demand: number
  ias: number
  density: number
}

export interface ProcessedData {
  overview: {
    nationalCoverage: number
    totalDoses: number
    criticalDepartments: number
    weeklyTrend: number
  }
  departments: VaccinationData[]
  trends: {
    week: string
    coverage: number
    doses: number
    emergency: number
  }[]
  alerts: {
    department: string
    level: 'critical' | 'warning' | 'good'
    message: string
    action: string
  }[]
}

// Mock data processor - in production, this would read from CSV files
export function processVaccinationData(): ProcessedData {
  // This would normally parse CSV files from the data/ directory
  // For now, we'll return structured mock data
  
  return {
    overview: {
      nationalCoverage: 52.2,
      totalDoses: 1280000,
      criticalDepartments: 43,
      weeklyTrend: 2.1
    },
    departments: [
      {
        week: 'S47',
        department: 'Paris',
        coverage: 65.2,
        doses: 45000,
        target: 52000,
        population: 12000000,
        emergencyRate: 1250,
        sosRate: 3200,
        stock: 45000,
        demand: 52000,
        ias: 0.85,
        density: 12000
      },
      {
        week: 'S47',
        department: 'Lyon',
        coverage: 58.7,
        doses: 28000,
        target: 35000,
        population: 1800000,
        emergencyRate: 1450,
        sosRate: 3800,
        stock: 28000,
        demand: 35000,
        ias: 0.72,
        density: 4500
      },
      {
        week: 'S47',
        department: 'Marseille',
        coverage: 72.1,
        doses: 52000,
        target: 48000,
        population: 2000000,
        emergencyRate: 980,
        sosRate: 2400,
        stock: 52000,
        demand: 48000,
        ias: 0.68,
        density: 3800
      },
      {
        week: 'S47',
        department: 'Toulouse',
        coverage: 68.9,
        doses: 32000,
        target: 38000,
        population: 1500000,
        emergencyRate: 1100,
        sosRate: 2800,
        stock: 32000,
        demand: 38000,
        ias: 0.75,
        density: 3200
      },
      {
        week: 'S47',
        department: 'Nice',
        coverage: 54.3,
        doses: 18000,
        target: 28000,
        population: 1100000,
        emergencyRate: 1600,
        sosRate: 4200,
        stock: 18000,
        demand: 28000,
        ias: 0.62,
        density: 2800
      }
    ],
    trends: [
      { week: 'S40', coverage: 52.2, doses: 1250000, emergency: 450 },
      { week: 'S41', coverage: 54.1, doses: 1380000, emergency: 520 },
      { week: 'S42', coverage: 56.8, doses: 1450000, emergency: 680 },
      { week: 'S43', coverage: 58.2, doses: 1520000, emergency: 750 },
      { week: 'S44', coverage: 57.9, doses: 1480000, emergency: 820 },
      { week: 'S45', coverage: 57.1, doses: 1420000, emergency: 780 },
      { week: 'S46', coverage: 56.3, doses: 1350000, emergency: 650 },
      { week: 'S47', coverage: 55.8, doses: 1280000, emergency: 580 }
    ],
    alerts: [
      {
        department: 'Nice',
        level: 'critical',
        message: 'Stock critique - 4.8 jours de couverture',
        action: 'Livraison urgente requise'
      },
      {
        department: 'Lyon',
        level: 'critical',
        message: 'Couverture insuffisante - 58.7%',
        action: 'Renforcement des équipes'
      },
      {
        department: 'Paris',
        level: 'warning',
        message: 'Stock tendu - 8.6 jours de couverture',
        action: 'Planification des livraisons'
      },
      {
        department: 'Toulouse',
        level: 'warning',
        message: 'Besoin complémentaire de 6000 doses',
        action: 'Réapprovisionnement programmé'
      }
    ]
  }
}

// Utility functions for data analysis
export function calculateVacGap(coverage: number, regionalAverage: number): number {
  return coverage - regionalAverage
}

export function getRiskLevel(coverage: number, target: number): 'good' | 'warning' | 'critical' {
  const gap = target - coverage
  if (gap <= 5) return 'good'
  if (gap <= 15) return 'warning'
  return 'critical'
}

export function calculateStockDays(stock: number, weeklyDemand: number): number {
  return Math.round((stock / weeklyDemand) * 7 * 10) / 10
}

export function getDepartmentStatus(data: VaccinationData): {
  status: 'good' | 'warning' | 'critical'
  message: string
  action: string
} {
  const stockDays = calculateStockDays(data.stock, data.demand)
  const coverageGap = data.target - data.coverage
  
  if (stockDays < 5 || coverageGap > 20) {
    return {
      status: 'critical',
      message: `Stock critique (${stockDays}j) ou couverture très faible`,
      action: 'Intervention urgente requise'
    }
  }
  
  if (stockDays < 8 || coverageGap > 10) {
    return {
      status: 'warning',
      message: `Stock tendu (${stockDays}j) ou couverture insuffisante`,
      action: 'Planification des actions correctives'
    }
  }
  
  return {
    status: 'good',
    message: 'Situation sous contrôle',
    action: 'Surveillance continue'
  }
}

// Data export functions
export function exportToCSV(data: VaccinationData[]): string {
  const headers = [
    'Semaine',
    'Département',
    'Couverture (%)',
    'Doses',
    'Objectif',
    'Population',
    'Taux Urgences',
    'Taux SOS',
    'Stock',
    'Demande',
    'IAS',
    'Densité'
  ]
  
  const rows = data.map(item => [
    item.week,
    item.department,
    item.coverage.toFixed(1),
    item.doses.toString(),
    item.target.toString(),
    item.population.toString(),
    item.emergencyRate.toString(),
    item.sosRate.toString(),
    item.stock.toString(),
    item.demand.toString(),
    item.ias.toFixed(2),
    item.density.toString()
  ])
  
  return [headers, ...rows].map(row => row.join(',')).join('\n')
}

export function generateReport(data: ProcessedData): string {
  const { overview, departments, alerts } = data
  
  return `
RAPPORT DE SURVEILLANCE VACCINATION GRIPPE
==========================================

SITUATION GÉNÉRALE:
- Couverture nationale: ${formatPercentage(overview.nationalCoverage)}
- Doses administrées: ${formatNumber(overview.totalDoses)}
- Départements critiques: ${overview.criticalDepartments}
- Tendance hebdomadaire: ${overview.weeklyTrend > 0 ? '+' : ''}${formatPercentage(overview.weeklyTrend)}

DÉPARTEMENTS PRIORITAIRES:
${departments
  .filter(d => getRiskLevel(d.coverage, d.target) === 'critical')
  .map(d => `- ${d.department}: ${formatPercentage(d.coverage)} (objectif: ${formatPercentage(d.target)})`)
  .join('\n')}

ALERTES ACTIVES:
${alerts.map(alert => `- ${alert.department}: ${alert.message}`).join('\n')}

RECOMMANDATIONS:
1. Réapprovisionner les départements en situation critique
2. Renforcer les équipes dans les zones à faible couverture
3. Optimiser la distribution selon la demande prévue
4. Maintenir la surveillance des indicateurs d'urgence

Généré le: ${new Date().toLocaleString('fr-FR')}
  `.trim()
}
