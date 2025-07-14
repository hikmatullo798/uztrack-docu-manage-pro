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
        return 'bg-destructive text-destructive-foreground animate-pulse';
      case 'warning':
        return 'bg-amber-500 text-white';
      case 'expired':
        return 'bg-gray-900 text-white';
      case 'safe':
        return 'bg-green-600 text-white';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getTruckStyles = (status: TruckStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-600 text-white';
      case 'maintenance':
        return 'bg-amber-500 text-white';
      case 'sold':
        return 'bg-gray-600 text-white';
      case 'inactive':
        return 'bg-destructive text-destructive-foreground';
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