import {
  ChartColumn,
  ChartGantt,
  ChartLine,
  ChartNoAxesColumnIncreasing,
  ClipboardCheck,
  FileChartColumn,
  FileSearch,
  FileText,
  Gauge,
  LifeBuoy,
  Network,
  Route,
  ShieldCheck,
  SlidersHorizontal,
  Target,
  Users,
  Workflow,
  type LucideProps,
} from "lucide-react";

/** Line icons referenced by name from content files. */
const registry = {
  chartColumn: ChartColumn,
  chartGantt: ChartGantt,
  chartLine: ChartLine,
  chartRising: ChartNoAxesColumnIncreasing,
  clipboardCheck: ClipboardCheck,
  fileChart: FileChartColumn,
  fileSearch: FileSearch,
  fileText: FileText,
  gauge: Gauge,
  lifeBuoy: LifeBuoy,
  network: Network,
  route: Route,
  shieldCheck: ShieldCheck,
  sliders: SlidersHorizontal,
  target: Target,
  users: Users,
  workflow: Workflow,
};

export type IconName = keyof typeof registry;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = registry[name];
  return <Component aria-hidden strokeWidth={1.25} {...props} />;
}
