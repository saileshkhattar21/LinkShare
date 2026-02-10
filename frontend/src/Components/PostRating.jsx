import { Rating } from "react-simple-star-rating";

const PostRating = ({ post, handleRate }) => {
  return (
    <Rating
      initialValue={post.userRating || 0}
      allowFraction
      size={40}
      onClick={(value) => handleRate(post._id, value)}
    />
  );
};

export default PostRating;
