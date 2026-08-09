import { getMisCuyesData } from "./services/cuy.server";
import MisCuyesClient from "./MisCuyesClient";

export default async function MisCuyesPage() {
  const initialData = await getMisCuyesData();

  return (
    <MisCuyesClient
      initialData={initialData}
    />
  );
}