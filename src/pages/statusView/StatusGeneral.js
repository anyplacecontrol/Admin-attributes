import React from "react";
import PropTypes from "prop-types";
import * as dataFuncs from "../../utils/dataFuncs";
import * as statusViewRedux from "../../redux/modules/statusViewRedux";

export class StatusGeneral extends React.Component {
  render() {
    let isEditExisting = this.props.status.id > 0;

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">General</div>
        <div className="block-set__inner flex w100 animated">
          <div className="block-set__item flex animated">
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Name
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  type="text"
                  value={this.props.status.name}
                  onChange={e => this.props.onChangeName(e.target.value)}
                />
              </div>

              <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Description
              </div>
              <div className="block-set__content flex w100 animated">
                <textarea
                  className="block-set__text-area"
                  value={this.props.status.description || ""}
                  onChange={e => this.props.onChangeDescription(e.target.value)}
                />
              </div>
            </div>
            </div>

            {isEditExisting && (
              <>
                <div className="block-set__item--inner flex w100 animated">
                  <div className="block-set__sub-title flex w100 animated">
                    ID
                  </div>
                  <div className="block-set__content flex w100 animated">
                    <div className="block-set__info flex animated">
                      <div className="block-set__info--title animated">
                        {this.props.status.id}
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

StatusGeneral.propTypes = {
  status: PropTypes.shape(statusViewRedux.IStatus), 
  onChangeName: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired, 
};
