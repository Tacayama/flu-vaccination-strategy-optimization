import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart3, 
  MapPin, 
  AlertTriangle, 
  Calendar, 
  Users,
  Shield,
  Settings,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  CheckCircle,
  Clock,
  Package,
  Truck,
  Warehouse,
  Bell,
  Zap,
  Calculator,
  Award,
  PieChart as PieChartIcon
} from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  change?: {
    value: string
    type: 'increase' | 'decrease' | 'neutral'
  }
  icon: React.ComponentType<{ className?: string }>
  description?: string
}

export function MetricCard({ title, value, change, icon: Icon, description }: MetricCardProps) {
  const changeColor = change?.type === 'increase' ? 'text-green-600' : 
                     change?.type === 'decrease' ? 'text-red-600' : 'text-blue-600'
  
  const ChangeIcon = change?.type === 'increase' ? TrendingUp : 
                    change?.type === 'decrease' ? TrendingDown : Activity

  return (
    <Card className="metric-card animate-fade-in-up">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-700 mb-2">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
            {change && (
              <div className="flex items-center mb-2">
                <ChangeIcon className={`h-4 w-4 mr-1 ${changeColor}`} />
                <span className={`text-sm font-medium ${changeColor}`}>{change.value}</span>
              </div>
            )}
            {description && (
              <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            )}
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 shadow-sm">
            <Icon className="h-8 w-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface StatusBadgeProps {
  status: string
  children: React.ReactNode
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  const statusConfig = {
    good: { className: 'badge-success' },
    warning: { className: 'badge-warning' },
    critical: { className: 'badge-danger' },
    success: { className: 'badge-success' },
    error: { className: 'badge-danger' },
    info: { className: 'badge-info' }
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.info

  return (
    <Badge className={config.className}>
      {children}
    </Badge>
  )
}

interface AlertCardProps {
  title: string
  description: string
  level: 'low' | 'medium' | 'high' | 'critical'
  action?: string
  icon?: React.ComponentType<{ className?: string }>
}

export function AlertCard({ title, description, level, action, icon: Icon }: AlertCardProps) {
  const levelConfig = {
    low: { 
      color: 'success-card', 
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100'
    },
    medium: { 
      color: 'warning-card', 
      iconColor: 'text-yellow-600',
      iconBg: 'bg-yellow-100'
    },
    high: { 
      color: 'alert-card', 
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100'
    },
    critical: { 
      color: 'alert-card', 
      iconColor: 'text-red-600',
      iconBg: 'bg-red-100'
    }
  }

  const config = levelConfig[level]
  const DefaultIcon = level === 'critical' ? AlertTriangle : 
                      level === 'high' ? AlertTriangle : 
                      level === 'medium' ? Clock : CheckCircle

  return (
    <Card className={`${config.color} animate-slide-in-right`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className={`p-2 rounded-lg ${config.iconBg}`}>
              {Icon ? <Icon className={`h-5 w-5 ${config.iconColor}`} /> : 
                     <DefaultIcon className={`h-5 w-5 ${config.iconColor}`} />}
            </div>
            <div className="flex-1">
            <h4 className="font-medium text-gray-900 mb-1 text-sm">{title}</h4>
            <p className="text-xs text-gray-700 leading-relaxed mb-2">{description}</p>
              {action && (
                <p className="text-sm font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-lg inline-block">
                  {action}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface ProgressCardProps {
  title: string
  value: number
  max: number
  description?: string
  showPercentage?: boolean
}

export function ProgressCard({ title, value, max, description, showPercentage = true }: ProgressCardProps) {
  const percentage = (value / max) * 100
  
  return (
    <Card className="stat-card animate-fade-in-up">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-gray-700">{title}</h3>
            {showPercentage && (
              <span className="text-sm font-bold text-gray-900">{percentage.toFixed(1)}%</span>
            )}
          </div>
          <div className="relative">
            <Progress value={percentage} className="h-3 bg-gray-200" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">
                {percentage.toFixed(0)}%
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="font-medium">{value.toLocaleString()}</span>
            <span className="font-medium">{max.toLocaleString()}</span>
          </div>
          {description && (
            <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
