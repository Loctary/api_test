/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
// actions
import { fetchHouses, fetchHousesSuccess, fetchHousesError } from '../../store/modules/houses';
// components
import HouseCard from '../HouseCard/HouseCard';
import Header from '../Header/Header';
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

  handleLoad = page => {
    const { itemsPerPage } = this.state;
    const url = `${API}?${LIMIT + itemsPerPage}&${OFFSET + itemsPerPage * page}`;
    this.fetchData(url);
    this.setState({ currentPage: page });
  };

  render() {
    const {
      props: {
        houses: {
          items,
          pending,
          pagination: { total },
          errors,
        },
      },
      state: { currentPage, itemsPerPage },
    } = this;

    if (errors)
      return (
        <Fragment>
          <Header />
          <h1 className="error">Произошла ошибка</h1>
          <button
            className="reload"
            type="button"
            onClick={() => {
              this.handleLoad(currentPage);
            }}
          >
            Перезагрузить
          </button>
        </Fragment>
      );

    return (
      <Fragment>
        <Header />
        <div className="navigation">
          <a>Элитная загородная недвижимость</a>
          <span>&gt;</span>
          <a>Продажа</a>
          <span>&gt;</span>
          <a>Дом</a>
        </div>
        <h1 className="elite-header">Элитная недвижимость в Подмосковье</h1>
        <InfiniteScroll
          className="scroll-content"
          pageStart={currentPage}
          loadMore={this.handleLoad}
          hasMore={itemsPerPage * (currentPage + 1) < total && !pending}
          loader={pending && <h1 className="loading">Загрузка...</h1>}
        >
          <div className="houses">
            {items &&
              items.map((element, id) => (
                <HouseCard key={`house#${itemsPerPage * currentPage + id}`} HouseCard house={element} />
              ))}
          </div>
        </InfiniteScroll>
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
