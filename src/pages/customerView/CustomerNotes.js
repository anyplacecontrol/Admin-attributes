import React from "react";
import PropTypes from "prop-types";
import { ICustomerNotes } from "../../redux/modules/customerViewRedux";

export class CustomerNotes extends React.Component {
  render() {    

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">
          Customer Notes (Emulated)
        </div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {/* Additional Customer Info */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Additional Customer Info
              </div>
              <div className="block-set__content flex w100 animated">
                <textarea
                  placeholder="Type in..."
                  className="block-set__text-area"
                  value={this.props.notes.additionalInfo || ""}
                  onChange={e =>
                    this.props.onChangeAdditionalInfo(e.target.value)
                  }
                />
              </div>
            </div>

            {/* Customer Children's Name(s) */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                {"Customer Children's Name(s)"}
              </div>
              <div className="block-set__content flex w100 animated">
                <textarea
                  placeholder="Type in..."
                  className="block-set__text-area"
                  value={this.props.notes.childrens || ""}
                  onChange={e => this.props.onChangeChildrens(e.target.value)}
                />
              </div>
            </div>

            {/* Customer Pets' Name(s) */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                {"Customer Pets' Name(s)"}
              </div>
              <div className="block-set__content flex w100 animated">
                <textarea
                  placeholder="Type in..."
                  className="block-set__text-area"
                  value={this.props.notes.pets || ""}
                  onChange={e => this.props.onChangePets(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">
            {/* Spouse/Partner Name(s) */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Spouse/Partner Name(s)
              </div>
              <div className="block-set__content flex w100 animated">
                <textarea
                  placeholder="Type in..."
                  className="block-set__text-area"
                  value={this.props.notes.partners || ""}
                  onChange={e => this.props.onChangePartners(e.target.value)}
                />
              </div>
            </div>

            {/* Customer Allergies */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Customer Allergies
              </div>
              <div className="block-set__content flex w100 animated">
                <textarea
                  placeholder="Type in..."
                  className="block-set__text-area"
                  value={this.props.notes.allergies || ""}
                  onChange={e => this.props.onChangeAllergies(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CustomerNotes.propTypes = {
  notes: ICustomerNotes,
  onChangeAdditionalInfo: PropTypes.func.isRequired,
  onChangeChildrens: PropTypes.func.isRequired,
  onChangePets: PropTypes.func.isRequired,
  onChangePartners: PropTypes.func.isRequired,
  onChangeAllergies: PropTypes.func.isRequired
};
