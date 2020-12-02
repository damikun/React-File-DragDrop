import clsx from "clsx";

type ProgressBarProps = {
  color?: string;
  value: number;
  barOnly?: boolean;
  className?: string;
};

function GetStatus(value: number) {
  return (
    <span
      className={clsx(
        "text-xxs md:text-xs tracking-wider",
        "font-semibold inline-block px-2 py-05",
        "uppercase rounded-full leading-none",

        value <= 0 && "text-gray-600 bg-gray-100 ",
        value > 0 && value < 100 && "text-blue-600 bg-blue-100 ",
        value >= 100 && "text-white bg-green-400  "
      )}
    >
      {value <= 0 || isNaN(value)
        ? "No progress"
        : value > 0 && value < 100
        ? "In progress"
        : "All done"}
    </span>
  );
}

export default function ProgressBar({
  value,
  color = "bg-green-500",
  barOnly = false,
  className,
}: ProgressBarProps) {
  const tmp_value = value < 0 ? 0 : value > 100 ? 100 : value;
  return (
    <div className={clsx("flex-1", className)}>
      <div className="flex flex-col space-y-1">
        {!barOnly && (
          <div className="flex items-center justify-between">
            <div>{GetStatus(tmp_value)}</div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block">{`${
                isNaN(tmp_value) ? 0 : tmp_value
              }%`}</span>
            </div>
          </div>
        )}

        <div className="flex space-x-2 py-1 overflow-hidden">
          <div className={clsx("flex w-full h-3 rounded bg-gray-200",
                               "overflow-hidden cursor-pointer")}>
            <div
              style={{ width: `${tmp_value}%` }}
              className={clsx(
                "shadow-none flex text-center whitespace-pre",
                "text-white justify-center transform transition",
                "ease-in duration-200 hover:opacity-50 relative",
                color
              )}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
