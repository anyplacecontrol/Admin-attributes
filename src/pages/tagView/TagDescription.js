import React from "react";
import PropTypes from "prop-types";
import * as tagViewRedux from "../../redux/modules/tagViewRedux";

export class TagDescription extends React.Component {
  render() {
    let isEditExisting = this.props.tag.id > 0;

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Description</div>
        <div className="block-set__inner flex w100 animated">
          <div className="block-set__item flex animated">
          {/* ---Name--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Name*
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className={
                    !this.props.tag.isValidated ||
                    this.props.tag.name != ""
                      ? "block-set__input animated"
                      : "block-set__input animated is--error"
                  }
                  type="text"
                  value={this.props.tag.name}
                  onChange={e => this.props.onChangeName(e.target.value)}
                />
              </div>
            </div>

            {/* --- ID --- */}
            {isEditExisting && (
              <>
                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    ID
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <div className="block-set__info flex animated">
                      <div className="block-set__info--title animated">
                        {this.props.tag.id}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

TagDescription.propTypes = {
  tag: tagViewRedux.ITagView,
  onChangeName: PropTypes.func.isRequired
};
