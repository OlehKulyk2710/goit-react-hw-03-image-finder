import PropTypes from 'prop-types';
import { LoadMore } from './Button.styled';

const Button = ({ onBtnClick }) => {
  return (
    <LoadMore type="button" onClick={onBtnClick}>
      Load more
    </LoadMore>
  );
};

export default Button;

Button.propTypes = {
  onBtnClick: PropTypes.func.isRequired,
};
