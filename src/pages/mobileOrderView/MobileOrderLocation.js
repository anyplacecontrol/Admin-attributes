import React from "react";
import {IStoreView} from "../../redux/modules/storeViewRedux";

export class MobileOrderLocation extends React.Component {
  
  render() {    
    let storeId = "";
    let storeAddress = "";
    let storeName = "";
    if (this.props.store) {    
      storeName = this.props.store.name;
      storeId = this.props.store.id;
      if (this.props.store.address) {
        storeAddress = "(" + this.props.store.address.city + ", " +this.props.store.address.country + ")";
      }
    }

    return (
        <div className="block-set__box flex animated">
        <div className="block-set__title animated">Location</div>
        <div className="block-set__inner flex w100 animated">
          <div className="block-set__item v2 flex animated">


            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Store ID
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {storeId}
                  </div>
                  <div className="block-set__info--more animated">
                    / {storeName + " " + storeAddress}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    );
  }
}

MobileOrderLocation.propTypes = {
  store: IStoreView,  
};
