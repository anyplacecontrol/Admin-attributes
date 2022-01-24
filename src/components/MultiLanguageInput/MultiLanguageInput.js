import React from "react";
import PropTypes from "prop-types";
import { IBaseView } from "../../redux/modules/baseViewRedux";
import { isEmptyOrLongString, isLongString } from "../../utils/viewValidators";
import * as dataFuncs from "../../utils/dataFuncs";

export class MultiLanguageInput extends React.Component {
  render() {
    // <input> or <textarea> ?
    let clsName = "block-set__input animated";
    if (this.props.inputType === "textarea")
      clsName = "block-set__text-area animated";   

    //Validate errors (highlighting) only for English language
    if (
      (this.props.viewItem.language === "en" ) &&
      this.props.viewItem.isValidated
    ) {
      //select kind of validation: isLongString or isEmptyOrLongString
      let checkProcedure = isLongString;
      if (this.props.canNotBeEmpty) checkProcedure = isEmptyOrLongString;

      if (checkProcedure( this.props.getFieldValue(this.props.viewItem)))
        clsName = clsName + " is--error";
    }
    
    let value = dataFuncs.getTranslatedViewField(
        this.props.viewItem,
        this.props.getFieldValue
      );

    if (this.props.inputType === "textarea")
      return (
        <textarea          
          placeholder={this.props.placeholder}
          className={clsName}
          type="text"
          value={value}
          onChange={e => this.props.onChange(e.target.value)}          
        />
      );
    else
      return (
        <input          
          placeholder={this.props.placeholder}
          className={clsName}
          type="text"
          value={value}          
          onChange={e => this.props.onChange(e.target.value)}
        />
      );
  }
}

MultiLanguageInput.propTypes = {
  viewItem: PropTypes.shape(IBaseView).isRequired,
  inputType: PropTypes.string, //"input" or "textarea"
  getFieldValue: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  canNotBeEmpty: PropTypes.bool, //true: input field can NOT be empty!  
};
