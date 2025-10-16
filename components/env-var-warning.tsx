import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function EnvVarWarning() {
  return (
    <div className="surface flex flex-wrap items-center justify-between gap-4 rounded-[2.25rem] border border-border/55 bg-card/80 p-5 shadow-soft">
      <Badge variant={"outline"} className="bg-transparent px-4 py-2 tracking-[0.18em]">
        Supabase environment variables required
      </Badge>
      <div className="flex gap-2">
        <Button size="sm" variant={"outline"} disabled className="tracking-[0.16em]">
          Sign in
        </Button>
        <Button size="sm" variant={"default"} disabled className="shadow-soft">
          Sign up
        </Button>
      </div>
    </div>
  );
}
