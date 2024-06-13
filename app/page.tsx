import Pagination from "./components/Pagination";

export default function Home({searchParams}: {searchParams: { page: string }}) {
  return(
    <>
     <div>Hello World</div>
     <Pagination currentPage={parseInt(searchParams.page)} pageSize={5} itemCount={100} />
    </>
  );
}
