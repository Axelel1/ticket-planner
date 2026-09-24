import clsx from 'clsx';

type Status = 'on-time' | 'delayed' | 'cancelled';

const styles: Record<Status, string> = {
  'on-time': 'bg-status-ontime/10 text-status-ontime',
  delayed: 'bg-status-delayed/10 text-status-delayed',
  cancelled: 'bg-status-cancelled/10 text-status-cancelled',
};

const labels: Record<Status, string> = {
  'on-time': 'On Time',
  delayed: 'Delayed',
  cancelled: 'Cancelled',
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={clsx('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', styles[status])}>
      {labels[status]}
    </span>
  );
}