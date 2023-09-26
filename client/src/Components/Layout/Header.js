import React from 'react';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
import MainImage from './MainImage';

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Food Order</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <MainImage />
    </React.Fragment>
  );
};

export default Header;
