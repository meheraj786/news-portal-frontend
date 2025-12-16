type TagsCloudProps = {
  tags: string[];
};

const TagCard: React.FC<TagsCloudProps> = ({ tags }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
        Tags Cloud
      </h3>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="
              bg-gray-100
              hover:bg-pink-600 hover:text-white
              px-3 py-1
              rounded
              text-sm
              text-gray-700
              cursor-pointer
              transition-colors
            "
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagCard;
