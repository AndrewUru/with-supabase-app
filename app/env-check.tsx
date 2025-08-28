export default function EnvCheck() {
  return (
    <div>
      <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
      <p>
        Anon Key exists:{" "}
        {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "YES" : "NO"}
      </p>
    </div>
  );
}
