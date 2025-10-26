import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <div
      className="flex min-h-svh w-full items-center justify-center p-6 md:p-10"
      data-oid="37bakfg"
    >
      <div className="w-full max-w-sm" data-oid="5tsjg3d">
        <div className="flex flex-col gap-6" data-oid="gpegj:-">
          <Card data-oid="bv2-ptu">
            <CardHeader data-oid="xl920:0">
              <CardTitle className="text-2xl" data-oid="ccaw1ug">
                Sorry, something went wrong.
              </CardTitle>
            </CardHeader>
            <CardContent data-oid="qfj2q9v">
              {params?.error ? (
                <p className="text-sm text-muted-foreground" data-oid="ti604s9">
                  Code error: {params.error}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground" data-oid="9qbvlmu">
                  An unspecified error occurred.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
