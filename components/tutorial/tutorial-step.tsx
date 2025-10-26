import { Checkbox } from "../ui/checkbox";

export function TutorialStep({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="relative" data-oid="rr7zu2c">
      <Checkbox
        id={title}
        name={title}
        className={`absolute top-[3px] mr-2 peer`}
        data-oid="cb.1ypg"
      />

      <label
        htmlFor={title}
        className={`relative text-base text-foreground peer-checked:line-through font-medium`}
        data-oid="ii2soip"
      >
        <span className="ml-8" data-oid=".h6446l">
          {title}
        </span>
        <div
          className={`ml-8 text-sm peer-checked:line-through font-normal text-muted-foreground`}
          data-oid="dcrktax"
        >
          {children}
        </div>
      </label>
    </li>
  );
}
