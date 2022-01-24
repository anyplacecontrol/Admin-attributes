import React from "react";
import PropTypes from "prop-types";

export class LanguageButtons extends React.Component {

  onButtonClick = (lang) => {
    if (lang != this.props.language )
      this.props.onChangeLanguage(lang)
  }

  render() {
    return (
      <div className="schedule w100 animated">
        <div className="schedule__buttons flex animated">
          <div className="schedule__buttons--left flex animated">
            {/* !-- Active button-- */}
            <button
              className={
                this.props.language === "en"
                  ? "schedule__button flex is--active animated"
                  : "schedule__button flex animated"
              }
              onClick={() => this.onButtonClick("en")}
            >
              English
            </button>

            <button 
            className={
                this.props.language === "es"
                  ? "schedule__button flex is--active animated"
                  : "schedule__button flex animated"
              }
            onClick={() => this.onButtonClick("es")}
            >Spanish</button>
          </div>

          <div className="schedule__buttons--right flex animated">
            {/* ---- */}
          </div>
        </div>
      </div>
    );
  }
}

LanguageButtons.propTypes = {
  language: PropTypes.string.isRequired,
  onChangeLanguage: PropTypes.func.isRequired
};
