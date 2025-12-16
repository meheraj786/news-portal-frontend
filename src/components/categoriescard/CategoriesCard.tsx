type Props = {
  categories: string[];
};

const CategoriesCard: React.FC<Props> = ({ categories }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
        Categories
      </h3>

      <ul className="space-y-2">
        {categories.map((cat, i) => (
          <li key={i}>
            <span className="text-gray-700 hover:text-pink-600 cursor-pointer">
              {cat}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesCard;
