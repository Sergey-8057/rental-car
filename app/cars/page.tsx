import { serverFetchCars } from '@/lib/api/serverApi';

export default async function CarssPage() {
  //{ params }: Props
  // const tag = slug[0];
  // const search = '';
  // const page = 1;
  // const perPage = 12;
  // const initialData = await fetchNotes(search, page, perPage, tag);
  const initialData = await serverFetchCars();

  return (
    // <NotesClient initialData={initialData} initialSearch={search} initialPage={page} tag={tag} />
    <section>
      <div>
        <h1>Catalog</h1>
        <p>initialData</p>
      </div>
    </section>
  );
}
