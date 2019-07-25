import React from 'react';
import PropTypes from 'prop-types';
// styles
import './HouseCard.scss';

const IMG = 'https://images.jqestate.ru/';
const POSTFIX = '-thumbnail-512';

const HouseCard = props => {
  const {
    house: {
      images,
      id,
      location: { settlementName, mkadDistance },
      saleOffer,
      landDetails: { area },
      specification,
    },
  } = props;

  return (
    <div className="house">
      <div className="house-img">
        <img src={`${images[0] ? IMG + images[0].id + POSTFIX : ''}`} alt="house" />
      </div>
      <p className="description">{`Дом в посёлке${settlementName ? ` «${settlementName}»` : ''}${
        mkadDistance ? ` ${mkadDistance} км` : ''
      }, ID ${id}`}</p>
      <h4>{`${saleOffer ? `$ ${saleOffer.price}` : 'не для продажи'}`}</h4>
      <div className="specifications">
        <p>{`${area} сот`}</p>
        {specification.area && (
          <p className="area">
            {`${specification.area} м`}
            <sup>2</sup>
          </p>
        )}
      </div>
    </div>
  );
};

HouseCard.propTypes = {
  house: PropTypes.shape({
    images: PropTypes.instanceOf(Array),
    id: PropTypes.number,
    location: PropTypes.shape({
      settlementName: PropTypes.string,
      mkadDistance: PropTypes.number,
    }),
    saleOffer: PropTypes.shape({
      price: PropTypes.number,
    }),
    landDetails: PropTypes.shape({
      area: PropTypes.number,
    }),
    specification: PropTypes.shape({
      area: PropTypes.number,
    }),
  }).isRequired,
};

export default HouseCard;
