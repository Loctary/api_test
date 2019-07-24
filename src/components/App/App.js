import React, { Component } from 'react';
import { connect } from 'react-redux';
import { housesFetchData } from '../../store/modules/houses';

class App extends Component {
  componentDidMount() {}

  render() {
    return <div />;
  }
}

const mapStateToProps = store => ({ houses: store.houses });

const mapDispatchToProps = { fetchData: housesFetchData };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
