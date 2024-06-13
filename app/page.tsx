import Pagination from "./components/Pagination";

export default function Home() {
  return(
    <>
     <div>Hello World</div>
     <Pagination currentPage={1} pageSize={5} itemCount={100} />
    </>
  );
}
