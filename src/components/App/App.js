import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { fetchHouses, fetchHousesSuccess, fetchHousesError } from '../../store/modules/houses';

const API = `https://api.jqestate.ru/v1/properties/country`;
const LIMIT = 'pagination[limit]=';
const OFFSET = 'pagination[offset]=';

class App extends Component {
  state = {
    itemsPerPage: 10,
    currentPage: 0,
  };

  componentDidMount() {
    const {
      state: { itemsPerPage, currentPage },
    } = this;
    const url = `${API}?${LIMIT + itemsPerPage}&${OFFSET + itemsPerPage * currentPage}`;
    this.fetchData(url);
  }

  fetchData = url => {
    const { props } = this;
    props.fetchHouses();
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.errors) throw data.errors;
        props.fetchHousesSuccess({ ...data });
      })
      .catch(errors => props.fetchHousesError({ errors }));
  };

  handlePageChange = ({ selected }) => {
    const { itemsPerPage } = this.state;
    const url = `${API}?${LIMIT + itemsPerPage}&${OFFSET + itemsPerPage * selected}`;
    this.fetchData(url);
    this.setState({ currentPage: selected });
  };

  render() {
    const {
      props: {
        houses: {
          pending,
          pagination: { total },
        },
      },
      state: { currentPage, itemsPerPage },
    } = this;

    const pageCount = Math.ceil(total / itemsPerPage);
    return (
      <div>
        {pending && <h1>Loading...</h1>}
        <div />
        <ReactPaginate
          previousLabel="previous"
          nextLabel="next"
          breakClassName="break-me"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageChange}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="active"
          forcePage={currentPage}
        />
      </div>
    );
  }
}

App.propTypes = {
  fetchHouses: PropTypes.func.isRequired,
  fetchHousesSuccess: PropTypes.func.isRequired,
  fetchHousesError: PropTypes.func.isRequired,
  houses: PropTypes.shape({
    pending: PropTypes.bool.isRequired,
    pagination: PropTypes.shape({
      offset: PropTypes.number,
      total: PropTypes.number,
    }),
  }).isRequired,
};

const mapStateToProps = store => ({ houses: store.houses });

const mapDispatchToProps = { fetchHouses, fetchHousesSuccess, fetchHousesError };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
