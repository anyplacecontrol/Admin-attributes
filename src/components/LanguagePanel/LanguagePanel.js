import React from "react";
import PropTypes from "prop-types";

export class LanguagePanel extends React.Component {

  onTabClick = (lang) => {
    if (lang != this.props.language )
      this.props.onChangeLanguage(lang)
  }


  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">{this.props.caption}</div>     

        <div className="block-set__tabs flex animated">
          <button            
            className={
                this.props.language === "en"
                  ? "block-set__tabs--item flex is--current animated"
                  : "block-set__tabs--item flex animated"
              }
              onClick={() => this.onTabClick("en")}            
          >
            English
          </button>
          <button 
            className={
                this.props.language === "es"
                  ? "block-set__tabs--item flex is--current animated"
                  : "block-set__tabs--item flex animated"
              }
              onClick={() => this.onTabClick("es")}  
            >
            Spanish
          </button>
        </div>
        
        <div className="block-set__inner flex w100 animated">
          {this.props.children}
        </div>

      </div>
    );
  }
}

LanguagePanel.propTypes = {
  caption: PropTypes.string,
  children: PropTypes.any,
  language: PropTypes.string.isRequired,
  onChangeLanguage: PropTypes.func.isRequired
};
