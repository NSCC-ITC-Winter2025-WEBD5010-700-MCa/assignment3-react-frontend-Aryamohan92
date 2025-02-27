import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import BooksTable from "../components/layouts/booksTable";

const Books = () => {

  const { isPending, error, data} = useQuery({
    queryKey: ['booksData'],
    queryFn: async () => {
      console.log('Fetching Data')
      const response = await fetch('http://localhost:3000/books')
      return response.json()
    }
  })

  if(isPending) return <div>Loading...</div>
  if(error) return <div>`An error has occurred: + ${error.message}`</div>

  return (
    <div>
      <h1 className="text-2xl font-bold">Books</h1>
      {
        isPending ?
          <div>Loading...</div> :<BooksTable books={data}/>
         
      }
    </div>
  );
};
export default Books;
