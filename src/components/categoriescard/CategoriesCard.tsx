import { Link } from "react-router";

export type cat = {
  name: string;
  _id: string;
};

const CategoriesCard = ({ categories }: { categories: cat[] }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
        Categories
      </h3>

      <ul className="space-y-2">
        {categories?.map((cat, i) => (
          <li key={i}>
            <Link
              to={`/category/${cat._id}`}
              className="text-gray-700 hover:text-pink-600 cursor-pointer"
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesCard;
