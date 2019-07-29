import React from 'react';
import PropTypes from 'prop-types';
// icons
import { ReactComponent as Area1 } from '../../icons/area1.svg';
import { ReactComponent as Area2 } from '../../icons/area2.svg';
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
      <div className="description">
        <p>{`Дом в посёлке${settlementName ? ` «${settlementName}»` : ''}${
          mkadDistance ? ` ${mkadDistance} км` : ''
        }, ID ${id}`}</p>
      </div>

      <h4>{`${saleOffer ? `$${saleOffer.price.toLocaleString('ru-RU')}` : 'не для продажи'}`}</h4>
      <div className="specifications">
        <div className="area">
          <Area1 className="area-icon" />
          <p>{`${area} сот`}</p>
        </div>
        {specification.area && (
          <div className="area">
            <Area2 className="area-icon" />
            <p className="area-text">
              {`${specification.area} м`}
              <sup>2</sup>
            </p>
          </div>
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
