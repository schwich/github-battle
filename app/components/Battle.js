import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import PlayerPreview from './PlayerPreview';

class Battle extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      playerOneName: '',
      playerOneImage: null,
      playerTwoName: '',
      playerTwoImage: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, username) {
    // this.setState(() => {
    //   var newState = {};
    //   newState[id + 'Name'] = username;
    //   newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
    //   return newState;
    // });
    this.setState(() => ({
      [id + 'Name']: username,
      [id + 'Image']: `https://github.com/${username}.png?size=200`
    }))
  }

  handleReset(id) {
    this.setState(() => ({
      [id + 'Name']: '',
      [id + 'Image']: null
    }))
  }

  render() {
    let { match } = this.props;
    // var match = this.props.match;

    let {
      playerOneName,
      playerOneImage,
      playerTwoName,
      playerTwoImage
    } = this.state;

    // var playerOneName = this.state.playerOneName;
    // var playerTwoName = this.state.playerTwoName;

    // var playerOneImage = this.state.playerOneImage;
    // var playerTwoImage = this.state.playerTwoImage;

    // in a boolean expr, JS returns the second argument to a && if the first is true and the second is truthy
    // so <PlayerInput /> always returns truthy, and if the first bool returns truthy, then the entire expression is truthy and the second arg is returned
    // therefore the PlayerInput component is returned
    return (
      <div>
        <div className="row">
          {!playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit} />}

          {playerOneImage !== null &&
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}>
              <button
                className='reset'
                onClick={() => this.handleReset('playerOne')}>
                Reset
              </button>
            </PlayerPreview>}

          {!playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit} />}

          {playerTwoImage !== null &&
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}>
              <button
                className='reset'
                onClick={this.handleReset.bind(null, 'playerTwo')}>
                Reset
                </button>
            </PlayerPreview>}
        </div>

        {playerOneImage && playerTwoImage &&
          <Link
            className='button'
            to={{
              pathname: match.url + '/results',
              search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
            }}>
            Battle
          </Link>}
      </div>
    )
  }
}

class PlayerInput extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  static defaultProps = {
    label: 'Username'
  }

  state = {
    username: ''
  }

  handleChange = (event) => {
    var value = event.target.value;
    this.setState(() => {
      return {
        username: value
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }

  render() {
    const { username } = this.state;
    const { label } = this.props;

    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {label}
        </label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={username}
          onChange={this.handleChange} />
        <button
          className='button'
          type='submit'
          disabled={!username}>
          Submit
        </button>
      </form>
    );
  }
}

export default Battle;