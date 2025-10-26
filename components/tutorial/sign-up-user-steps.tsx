import Link from "next/link";
import { TutorialStep } from "./tutorial-step";
import { ArrowUpRight } from "lucide-react";

export function SignUpUserSteps() {
  return (
    <ol className="flex flex-col gap-6" data-oid="nl0e63-">
      {process.env.VERCEL_ENV === "preview" ||
      process.env.VERCEL_ENV === "production" ? (
        <TutorialStep title="Set up redirect urls" data-oid="200.3el">
          <p data-oid="p19uqso">It looks like this App is hosted on Vercel.</p>
          <p className="mt-4" data-oid="c8gefym">
            This particular deployment is
            <span
              className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border"
              data-oid="tbtq.-2"
            >
              &quot;{process.env.VERCEL_ENV}&quot;
            </span>{" "}
            on
            <span
              className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border"
              data-oid="etniu3y"
            >
              https://{process.env.VERCEL_URL}
            </span>
            .
          </p>
          <p className="mt-4" data-oid="34lwgdt">
            You will need to{" "}
            <Link
              className="text-primary hover:text-foreground"
              href={
                "https://supabase.com/dashboard/project/_/auth/url-configuration"
              }
              data-oid="3i747al"
            >
              update your Supabase project
            </Link>{" "}
            with redirect URLs based on your Vercel deployment URLs.
          </p>
          <ul className="mt-4" data-oid=".bs:c9y">
            <li data-oid="ejzq-67">
              -{" "}
              <span
                className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border"
                data-oid="mfgf5uq"
              >
                http://localhost:3000/**
              </span>
            </li>
            <li data-oid="bs._txk">
              -{" "}
              <span
                className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border"
                data-oid=".ev543."
              >
                {`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/**`}
              </span>
            </li>
            <li data-oid="jgjo9ky">
              -{" "}
              <span
                className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border"
                data-oid="y1l96wh"
              >
                {`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(
                  ".vercel.app",
                  "",
                )}-*-[vercel-team-url].vercel.app/**`}
              </span>{" "}
              (Vercel Team URL can be found in{" "}
              <Link
                className="text-primary hover:text-foreground"
                href="https://vercel.com/docs/accounts/create-a-team#find-your-team-id"
                target="_blank"
                data-oid=":dcj4zk"
              >
                Vercel Team settings
              </Link>
              )
            </li>
          </ul>
          <Link
            href="https://supabase.com/docs/guides/auth/redirect-urls#vercel-preview-urls"
            target="_blank"
            className="text-primary/50 hover:text-primary flex items-center text-sm gap-1 mt-4"
            data-oid="njqufdx"
          >
            Redirect URLs Docs <ArrowUpRight size={14} data-oid="ykjg5vu" />
          </Link>
        </TutorialStep>
      ) : null}
      <TutorialStep title="Sign up your first user" data-oid="vd2_9e7">
        <p data-oid="omyv194">
          Head over to the{" "}
          <Link
            href="auth/sign-up"
            className="font-bold hover:underline text-foreground/80"
            data-oid="jdze-et"
          >
            Sign up
          </Link>{" "}
          page and sign up your first user. It&apos;s okay if this is just you
          for now. Your awesome idea will have plenty of users later!
        </p>
      </TutorialStep>
    </ol>
  );
}
