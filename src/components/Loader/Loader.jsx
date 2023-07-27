import { Comment } from 'react-loader-spinner';
import { StyledLoader } from './Loader.styled';

const Loader = () => {
  return (
    <StyledLoader>
      <Comment
        visible={true}
        height="150"
        width="150"
        ariaLabel="comment-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color="#fff"
        backgroundColor="#3f6e93"
      />
    </StyledLoader>
  );
};

export default Loader;
