export default function EnvCheck() {
  return (
    <div data-oid="once.x6">
      <p data-oid="a6au_2.">URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
      <p data-oid="t9z0v.2">
        Anon Key exists:{" "}
        {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "YES" : "NO"}
      </p>
    </div>
  );
}
