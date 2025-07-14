import { cn } from '@/lib/utils';
import { AlertLevel, TruckStatus } from '@/types';

interface StatusBadgeProps {
  type: 'alert' | 'truck';
  status: AlertLevel | TruckStatus;
  className?: string;
}

export function StatusBadge({ type, status, className }: StatusBadgeProps) {
  const getAlertStyles = (level: AlertLevel) => {
    switch (level) {
      case 'critical':
        return 'bg-red-50 text-red-700 border border-red-200';
      case 'warning':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'expired':
        return 'bg-gray-50 text-gray-700 border border-gray-200';
      case 'safe':
        return 'bg-green-50 text-green-700 border border-green-200';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getTruckStyles = (status: TruckStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-700 border border-green-200';
      case 'maintenance':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'sold':
        return 'bg-gray-50 text-gray-700 border border-gray-200';
      case 'inactive':
        return 'bg-red-50 text-red-700 border border-red-200';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getAlertText = (level: AlertLevel) => {
    switch (level) {
      case 'critical': return 'Kritik';
      case 'warning': return 'Ogohlantirish';
      case 'expired': return 'Tugagan';
      case 'safe': return 'Xavfsiz';
      default: return level;
    }
  };

  const getTruckText = (status: TruckStatus) => {
    switch (status) {
      case 'active': return 'Faol';
      case 'maintenance': return 'Ta\'mirda';
      case 'sold': return 'Sotilgan';
      case 'inactive': return 'Faol emas';
      default: return status;
    }
  };

  const styles = type === 'alert' 
    ? getAlertStyles(status as AlertLevel)
    : getTruckStyles(status as TruckStatus);
  
  const text = type === 'alert'
    ? getAlertText(status as AlertLevel)
    : getTruckText(status as TruckStatus);

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      styles,
      className
    )}>
      {text}
    </span>
  );
}