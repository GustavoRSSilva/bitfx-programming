/**
 *
 * Book
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class Book extends React.PureComponent {
  render() {
    const { book } = this.props;
    console.log(book);
    return <div />;
  }
}

Book.propTypes = {};

export default Book;
