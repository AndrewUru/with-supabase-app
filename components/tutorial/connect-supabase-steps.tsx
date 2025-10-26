import { TutorialStep } from "./tutorial-step";

export function ConnectSupabaseSteps() {
  return (
    <ol className="flex flex-col gap-6" data-oid="0sjgd3r">
      <TutorialStep title="Create Supabase project" data-oid="sczxcxf">
        <p data-oid="uhzo3te">
          Head over to{" "}
          <a
            href="https://app.supabase.com/project/_/settings/api"
            target="_blank"
            className="font-bold hover:underline text-foreground/80"
            rel="noreferrer"
            data-oid="2i8xtgl"
          >
            database.new
          </a>{" "}
          and create a new Supabase project.
        </p>
      </TutorialStep>

      <TutorialStep title="Declare environment variables" data-oid="as3qztz">
        <p data-oid="q:swdme">
          Rename the{" "}
          <span
            className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border"
            data-oid="n0t.e3w"
          >
            .env.example
          </span>{" "}
          file in your Next.js app to{" "}
          <span
            className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border"
            data-oid="qs11res"
          >
            .env.local
          </span>{" "}
          and populate with values from{" "}
          <a
            href="https://app.supabase.com/project/_/settings/api"
            target="_blank"
            className="font-bold hover:underline text-foreground/80"
            rel="noreferrer"
            data-oid="u9p8o2p"
          >
            your Supabase project&apos;s API Settings
          </a>
          .
        </p>
      </TutorialStep>

      <TutorialStep
        title="Restart your Next.js development server"
        data-oid="58v::5p"
      >
        <p data-oid="acayhsp">
          You may need to quit your Next.js development server and run{" "}
          <span
            className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border"
            data-oid="d9l-vcd"
          >
            npm run dev
          </span>{" "}
          again to load the new environment variables.
        </p>
      </TutorialStep>

      <TutorialStep title="Refresh the page" data-oid="peo.hun">
        <p data-oid="-oq5b64">
          You may need to refresh the page for Next.js to load the new
          environment variables.
        </p>
      </TutorialStep>
    </ol>
  );
}
