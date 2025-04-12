import { IconWeight, Icon as PhosphorIcons } from "@phosphor-icons/react";

// styles
import "./Callout.css";

export type CalloutCategories =
  | "primary"
  | "secondary"
  | "danger"
  | "warn"
  | "neutral";

export type CalloutProps = {
  text: React.ReactNode;
  category: CalloutCategories;
  id?: string;
  Icon?: PhosphorIcons;
  IconWeight?: IconWeight;
  IconSize?: number;
};

const Callout = function ({
  text,
  category,
  id,
  Icon,
  IconSize,
  IconWeight,
}: CalloutProps) {
  return (
    <div id={id} className={`baseui-callout baseui-callout-${category}`}>
      {Icon && <Icon weight={IconWeight} size={IconSize} />}
      <span>{text}</span>
    </div>
  );
};

export default Callout;
