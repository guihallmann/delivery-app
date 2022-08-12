import React from 'react';
import PropTypes from 'prop-types';

function Button({
  children,
  dataTestid,
  onClickfn,
  disabled,
}) {
  return (
    <button
      type="button"
      data-testid={ dataTestid }
      disabled={ disabled || '' }
      onClick={ onClickfn }
    >
      { children }
    </button>
  );
}

Button.propTypes = {
  dataTestid: PropTypes.string,
  disabled: PropTypes.bool,
  onClickfn: PropTypes.func,
}.isRequired;

export default Button;