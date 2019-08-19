import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStarHalf } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const starStyles = (i, value, editing, starColor, emptyStarColor) => ({
  float: 'right',
  cursor: editing ? 'pointer' : 'default',
  color: value >= i ? starColor : emptyStarColor
});

const radioStyles = {
  display: 'none',
  position: 'absolute',
  marginLeft: -9999
};

const RenderStarIcon = ({index,value}) => {
    return (
    
    <span>
        {
            (index <= value) ?
            (<FontAwesomeIcon icon = {['fas',  'star']} />) :
            (<FontAwesomeIcon icon = {['far',  'star']} />)
        }
    </span>
)}

const RenderStarIconHalf = ()=> (
    <span>
        <span style={{position: 'absolute'}}><FontAwesomeIcon icon = {['far',  'star']} /></span>
        <span> <FontAwesomeIcon icon = {['fas',  'star-half']} /> </span>
    </span>
);

const RenderIcon = ({index, value}) => {
    if (
      typeof RenderStarIconHalf === 'function' &&
      Math.ceil(value) === index &&
      value % 1 !== 0
    ) {
      return <RenderStarIconHalf />;
    }

    if (typeof RenderStarIcon === 'function') {
      return <RenderStarIcon index={index} value={value}/>;
    }

    return <i key={`icon_${id}`} style={{fontStyle: 'normal'}}>&#9733;</i>;
}

const RenderStars = ({items}) => {

    const {
      value,
      name,
      editing,
      starCount,
      starColor,
      emptyStarColor,
    } = items;
    //const { value } = this.state;
    // populate stars
    let starNodes = [];

    for (let i = starCount; i > 0; i--) {
      const id = `${name}_${i}`;
      const starNodeInput = (
        <input
          key={`input_${id}`}
          style={radioStyles}
          className="dv-star-rating-input"
          type="radio"
          value={i}
          checked={value === i}
        />
      );
      const starNodeLabel = (
        <label
          key={`label_${id}`}
          style={starStyles(i, value, editing, starColor, emptyStarColor)}
          className={'dv-star-rating-star ' + (value >= i ? 'dv-star-rating-full-star' : 'dv-star-rating-empty-star')}>
          <RenderIcon
                index = {i}
                value  = {value}
          />
        </label>
      );

      starNodes.push(starNodeInput);
      starNodes.push(starNodeLabel);
    }

    return (starNodes);

}

class StarRatingComponent extends Component {
 
  constructor(props) {
    super(props);

  //  this.state = {
   //   value: props.value
  //  };
  }

  render() {
    const classes = (this.props.editing)?'dv-star-rating':
      'dv-star-rating-non-editable';
    return (
      <div style={{display: 'inline-block', position: 'relative'}} className={classes}>
 

      <RenderStars items = {this.props} />
      </div>
    );
  }

}

export default connect( state => {
    return {}
}, dispatch => {
    return {}
})(StarRatingComponent);
