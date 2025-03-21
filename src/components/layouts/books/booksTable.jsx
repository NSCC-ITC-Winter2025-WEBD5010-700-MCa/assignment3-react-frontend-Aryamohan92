import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate  } from "react-router-dom";


function BooksTable({ books }) {


    const navigate = useNavigate();
    const queryClient = useQueryClient();
   

    const deleteBookMutation = useMutation ({
        mutationFn: async(bookId) => {
            const response = await fetch(`${import.meta.env.VITE_BOOKS_API_URL}/${bookId}`, {
                method: 'DELETE'
            })
            return response.json()
            //console.log(bookId)
        },

        onSuccess: () => {
          
          queryClient.invalidateQueries(['booksData'])
        },
        onError: (error) => {
         alert('Unable to delete')
        }
    })

    const handleDelete = (bookId) =>{
        //send delete request to api
        //console.log(bookId)
        if(window.confirm(`Are you sure you wish to delete record ${bookId}`)){
           deleteBookMutation.mutate(bookId)
        }

    }
        
        

    
    return ( 
          <>
            
            <button onClick={() => navigate(`/admin/books/create`)} className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600">Add New Book</button>
            
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Author</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Genre</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>

                {
                  books.map(book => {
                    return (
                    <tr key={book._id}  className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2">{book._id}</td>
                      <td className="border border-gray-300 px-4 py-2">{book.title}</td>
                      <td className="border border-gray-300 px-4 py-2">{book.author}</td>
                      <td className="border border-gray-300 px-4 py-2">{book.published_year}</td>
                      <td className="border border-gray-300 px-4 py-2">{book.genre}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center space-x-1">
                      <button onClick={() => navigate(`/admin/books/${book._id}/details`)} className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600">Details</button>
                      <button onClick={ () => navigate(`/admin/books/${book._id}/edit`)} className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600">Edit</button>
                      <button onClick={ () => { handleDelete(book._id) } } className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600">Delete</button>
                      </td>
                    </tr>)
                  })
                }

                
              </tbody>
            </table>
          </>
        
     );
}

export default BooksTable;