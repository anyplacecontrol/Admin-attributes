import React from "react";
import PropTypes from "prop-types";

export class SleepScreenText extends React.Component {
  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Text</div>
        <div className="block-set__inner flex w100 animated">
          <div className="block-set__item flex animated">
            {/* Sleep Screen Text */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Sleep Screen Text
              </div>
              <div className="block-set__content flex w100 animated">
                <input className="block-set__input animated" value="" />
              </div>
            </div>                  
          
          </div>

          {/* ---Right Panel--- */}
          <div className="block-set__item flex animated">
            
                   
          </div>
        </div>
      </div>
    );
  }
}

SleepScreenText.propTypes = {};
