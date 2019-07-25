import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
// actions
import { fetchHouses, fetchHousesSuccess, fetchHousesError } from '../../store/modules/houses';
// components
import HouseCard from '../HouseCard/HouseCard';
// styles
import './App.scss';

const API = `https://api.jqestate.ru/v1/properties/country`;
const LIMIT = 'pagination[limit]=';
const OFFSET = 'pagination[offset]=';

class App extends Component {
  state = {
    itemsPerPage: 12,
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
        if (data.errors) throw (data.errors && data.errors[0]) || 'Error';
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

  handleItemsChange = event => {
    const itemsPerPage = parseInt(event.target.value, 10);
    this.setState({ itemsPerPage, currentPage: 0 }, () => {
      const url = `${API}?${LIMIT + itemsPerPage}&${OFFSET + 0}`;
      this.fetchData(url);
    });
  };

  render() {
    const {
      props: {
        houses: {
          pending,
          pagination: { total },
          items,
          errors,
        },
      },
      state: { currentPage, itemsPerPage },
    } = this;
    if (errors)
      return (
        <Fragment>
          <h1>Error occured</h1>
          <button
            type="button"
            onClick={() => {
              this.handlePageChange({ selected: currentPage });
            }}
          >
            Retry
          </button>
        </Fragment>
      );
    const pageCount = Math.ceil(total / itemsPerPage);

    return (
      <Fragment>
        {pending ? (
          <h1 className="loading">Loading...</h1>
        ) : (
          <div className="houses">
            {items &&
              items.map((element, id) => (
                <HouseCard key={`house#${itemsPerPage * currentPage + id}`} HouseCard house={element} />
              ))}
          </div>
        )}
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
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
        <div className="items-per-page">
          <p>На странице: </p>
          <select value={itemsPerPage} onChange={this.handleItemsChange}>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
            <option value={96}>96</option>
          </select>
        </div>
      </Fragment>
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
    items: PropTypes.instanceOf(Array),
    errors: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  }).isRequired,
};

const mapStateToProps = store => ({ houses: store.houses });

const mapDispatchToProps = { fetchHouses, fetchHousesSuccess, fetchHousesError };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
