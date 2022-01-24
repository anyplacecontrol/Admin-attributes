import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BaseView } from "../../components/BaseView/BaseView";
import {SleepScreenGeneral} from "./SleepScreenGeneral";
import {SleepScreenText} from "./SleepScreenText";
import {ImagesPanel} from "../../components/ImagesPanel/ImagesPanel";

export class sleepScreenView_ extends React.Component { 
  
  render() {
    return (
      <BaseView viewName="Kiosk Sleep Screen" actionsProvider={null}>       
       <SleepScreenGeneral/>
       <SleepScreenText/>
       
        {/* -- Image -- */}
        <ImagesPanel
          allowMultipleImages={false}
          images={[]}
          onAddImage={()=>{}}
          onDeleteImage={()=>{}}
          caption="Visual (PNG, JPG, GIF, MP4, 1080 x 1920 px, up to 10 Mb)"
          isError={false}
        />

      </BaseView>
    );
  }
}

sleepScreenView_.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    
  };
}

export const sleepScreenView = connect(mapStateToProps)(sleepScreenView_);
