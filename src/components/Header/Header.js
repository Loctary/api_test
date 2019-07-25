import React from 'react';
// icons
import { ReactComponent as Logo } from '../../icons/logo.svg';
// styles
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <Logo className="logo" />
      <ul>
        <li>
          <button type="button">Продажа</button>
        </li>
        <li>
          <button type="button">Аренда</button>
        </li>
        <li>
          <button type="button">Посёлки</button>
        </li>
        <li>
          <button type="button">О компании</button>
        </li>
      </ul>
      <div className="call-back">
        <a href="call:+74954324545">+7 (495) 432-45-45</a>
        <button type="button">Обратный звонок</button>
      </div>
    </header>
  );
};

export default Header;
