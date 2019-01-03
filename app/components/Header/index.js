/**
 *
 * Header
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Wrapper } from './styles';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.PureComponent {
  render() {
    return (
      <Wrapper>
      
        <FormattedMessage {...messages.header} />

      </Wrapper>
    );
  }
}

Header.propTypes = {};

export default Header;
