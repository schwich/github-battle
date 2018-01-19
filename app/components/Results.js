var React = require('react');

var api = require('../utils/api');

class Results extends React.Component {
  constructor(props) {
    super(props);
    
    var players = ['mdo', 'fat'];
    var results = api.battle(players);
    
    results.then( (data) => {
      console.log(data);
    });
    
  }

  render() {
    
    return (
      <div>Results</div>
    )
  }
}

module.exports = Results;