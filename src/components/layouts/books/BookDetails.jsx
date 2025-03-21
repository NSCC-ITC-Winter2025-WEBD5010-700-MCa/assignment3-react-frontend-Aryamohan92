import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";



const BookDetail = ({ book }) => {
  const { id } = useParams(); // Get book ID from URL

  const { isLoading, error, data } = useQuery({
    queryKey: ["bookDetail", id],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_BOOKS_API_URL}/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch book details");
      }
      return response.json();
    },
    staleTime: Infinity,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6 border rounded shadow-md bg-white max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">{data.title}</h2>
      <p><strong>Genre:</strong> {data.genre}</p>
      <p><strong>Author:</strong> {data.author}</p>
      <p><strong>Published Year:</strong> {data.published_year}</p>
      <p><strong>Pages:</strong> {data.pages}</p>
      <p><strong>Language:</strong> {data.language}</p>
      <p><strong>Popularity:</strong> {data.isPopular ? "Yes" : "No"}</p>

      {/* Check if characters exist before mapping */}
      {data.characters && data.characters.length > 0 && (
        <div className="mt-3">
          <strong>Characters:</strong>
          <ul className="list-disc list-inside ml-4">
            {data.characters.map((character, index) => (
              <li key={index}>{character}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Check if ratings exist before accessing */}
      {data.ratings && (
        <div className="mt-3">
          <strong>Ratings:</strong>
          <p>Critics: {data.ratings.critics}</p>
          <p>Readers: {data.ratings.readers}</p>
        </div>
      )}

      <Link
        to="/admin/books"
        className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Back to Books
      </Link>
    </div>
  );
};

export default BookDetail;
