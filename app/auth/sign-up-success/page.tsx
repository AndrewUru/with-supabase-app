import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div
      className="flex min-h-svh w-full items-center justify-center p-6 md:p-10"
      data-oid="-d5_kdz"
    >
      <div className="w-full max-w-sm" data-oid="im_27pr">
        <div className="flex flex-col gap-6" data-oid="-dm9-j5">
          <Card data-oid="n53yyz4">
            <CardHeader data-oid="ekn6s:q">
              <CardTitle className="text-2xl" data-oid="e_e7uec">
                Gracias por registrarte!
              </CardTitle>
              <CardDescription data-oid="vlk43db">
                Revisa tu correo para confirmar tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent data-oid=":00gjx2">
              <p className="text-sm text-muted-foreground" data-oid="em5xi2w">
                Te has registrado exitosamente. Por favor revisa tu correo para
                confirmar tu cuenta antes de iniciar sesión.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
