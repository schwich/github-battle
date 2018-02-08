import React from 'react';
import PropTypes from 'prop-types';

class TestingFlexbox extends React.Component {

  render() {
    return (
      <div className='parent'>
        <div className='child'>child</div>
        <div className='child'>child</div>
        <div className='child'>child</div>
        <div className='child'>child</div>
        <div className='child'>child</div>
      </div>
    )
  }
}

module.exports = TestingFlexbox;