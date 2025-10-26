import { TutorialStep } from "./tutorial-step";
import { CodeBlock } from "./code-block";

const create = `create table notes (
  id bigserial primary key,
  title text
);

insert into notes(title)
values
  ('Today I created a Supabase project.'),
  ('I added some data and queried it from Next.js.'),
  ('It was awesome!');
`.trim();

const rls = `alter table notes enable row level security;
create policy "Allow public read access" on notes
for select
using (true);`.trim();

const server = `import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: notes } = await supabase.from('notes').select()

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}
`.trim();

const client = `'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('notes').select()
      setNotes(data)
    }
    getData()
  }, [])

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}
`.trim();

export function FetchDataSteps() {
  return (
    <ol className="flex flex-col gap-6" data-oid="a8a_e9r">
      <TutorialStep
        title="Create some tables and insert some data"
        data-oid="2-2-v_v"
      >
        <p data-oid="4vryd-.">
          Head over to the{" "}
          <a
            href="https://supabase.com/dashboard/project/_/editor"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
            data-oid="9rs-nxj"
          >
            Table Editor
          </a>{" "}
          for your Supabase project to create a table and insert some example
          data. If you&apos;re stuck for creativity, you can copy and paste the
          following into the{" "}
          <a
            href="https://supabase.com/dashboard/project/_/sql/new"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
            data-oid="epl._5m"
          >
            SQL Editor
          </a>{" "}
          and click RUN!
        </p>
        <CodeBlock code={create} data-oid="8har9_." />
      </TutorialStep>

      <TutorialStep title="Enable Row Level Security (RLS)" data-oid="e3x7:en">
        <p data-oid="ex-:wd7">
          Supabase enables Row Level Security (RLS) by default. To query data
          from your <code data-oid="365:u1m">notes</code> table, you need to add
          a policy. You can do this in the{" "}
          <a
            href="https://supabase.com/dashboard/project/_/editor"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
            data-oid="od_a5.."
          >
            Table Editor
          </a>{" "}
          or via the{" "}
          <a
            href="https://supabase.com/dashboard/project/_/sql/new"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
            data-oid="9i6pghj"
          >
            SQL Editor
          </a>
          .
        </p>
        <p data-oid="03tfnab">
          For example, you can run the following SQL to allow public read
          access:
        </p>
        <CodeBlock code={rls} data-oid="vj_cih-" />
        <p data-oid="is43a07">
          You can learn more about RLS in the{" "}
          <a
            href="https://supabase.com/docs/guides/auth/row-level-security"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
            data-oid="08ou2gu"
          >
            Supabase docs
          </a>
          .
        </p>
      </TutorialStep>

      <TutorialStep title="Query Supabase data from Next.js" data-oid="7zbcuvg">
        <p data-oid="isz6z8y">
          To create a Supabase client and query data from an Async Server
          Component, create a new page.tsx file at{" "}
          <span
            className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border"
            data-oid="cap66no"
          >
            /app/notes/page.tsx
          </span>{" "}
          and add the following.
        </p>
        <CodeBlock code={server} data-oid="_l.cezd" />
        <p data-oid="j1it7m2">Alternatively, you can use a Client Component.</p>
        <CodeBlock code={client} data-oid="y1gzvd:" />
      </TutorialStep>

      <TutorialStep title="Explore the Supabase UI Library" data-oid="zath.:y">
        <p data-oid="89rqkc5">
          Head over to the{" "}
          <a
            href="https://supabase.com/ui"
            className="font-bold hover:underline text-foreground/80"
            data-oid="u0i-eoz"
          >
            Supabase UI library
          </a>{" "}
          and try installing some blocks. For example, you can install a
          Realtime Chat block by running:
        </p>
        <CodeBlock
          code={
            "npx shadcn@latest add https://supabase.com/ui/r/realtime-chat-nextjs.json"
          }
          data-oid=".24u:z4"
        />
      </TutorialStep>

      <TutorialStep
        title="Build in a weekend and scale to millions!"
        data-oid="t6c2t_h"
      >
        <p data-oid="ranknx2">
          You&apos;re ready to launch your product to the world! 🚀
        </p>
      </TutorialStep>
    </ol>
  );
}
