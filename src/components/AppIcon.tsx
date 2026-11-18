interface Props {
  icon: string;
  className?: string;
}
export function AppIcon({ icon, className = "" }: Props) {
  return (
    <span className={`app-icon icon-${icon} ${className}`} aria-hidden="true">
      <img src={`/assets/icon-${icon}.svg`} alt="" draggable="false" />
    </span>
  );
}
