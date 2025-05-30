// styles
import "./Stats.css";

export type StatsStatus = "up" | "down";

export type StatsProps = {
  title: string;
  metric: number;
  metricStatus: StatsStatus;
  metricLocale?: Intl.LocalesArgument;
  metricOptions?: Intl.NumberFormatOptions;
  value: number;
  valueUnit?: string;
  valueLocale?: Intl.LocalesArgument;
  valueOptions?: Intl.NumberFormatOptions;
};

const Stats = function ({
  title,
  metric,
  metricStatus,
  metricLocale,
  metricOptions,
  value,
  valueUnit,
  valueLocale,
  valueOptions,
}: StatsProps) {
  const metricFormatted = new Intl.NumberFormat(
    metricLocale,
    metricOptions,
  ).format(metric);

  const valueFormatted = new Intl.NumberFormat(
    valueLocale,
    valueOptions,
  ).format(value);

  return (
    <div className="fz-stats">
      <div className="fz-stats-head">
        <div className="fz-stats-head-title">{title}</div>
        <div
          className={`fz-stats-head-metric fz-stats-head-metric-${metricStatus}`}
        >
          {metricStatus === "up" ? "+" : "-"}
          {metricFormatted}
        </div>
      </div>
      <div className="fz-stats-body">
        {valueFormatted} {valueUnit}
      </div>
    </div>
  );
};

export default Stats;
