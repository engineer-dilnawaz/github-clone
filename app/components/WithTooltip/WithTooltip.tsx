import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type WithTooltipProps = {
  children: React.ReactNode;
  tooltip: string;
};

export const WithTooltip = ({ children, tooltip }: WithTooltipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};
