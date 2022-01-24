import React from "react";
import PropTypes from "prop-types";
import { ImagesPanel } from "../../components/ImagesPanel/ImagesPanel";

export class BundleBanner extends React.Component {

  onAddImage = () => {};

  onDeleteImage = () => {};

  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">
          Bundle Banner (hardcoded)
        </div>
        <div className="block-set__inner flex w100 animated">
          <div className="block-set__item flex animated">
            {/* ---Bundle Banner Title--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Bundle Banner Title
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  type="text"
                  value="Title"
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>

          {/* ---Right Panel--- */}
          <div className="block-set__item flex animated">
            {/* ---Description --- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Description
              </div>
              <div className="block-set__content flex w100 animated">
                <textarea
                  className="block-set__text-area animated"
                  value="Type in..."
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
        {/* -- Image -- */}
        <ImagesPanel
          allowMultipleImages={false}
          images={[]}
          onAddImage={this.onAddImage}
          onDeleteImage={this.onDeleteImage}
          caption="Bundle Banner Icon"
          // isError={
          //   this.props.recipe.isValidated && !this.props.category.image
          // }
        />
        <ImagesPanel
          allowMultipleImages={false}
          images={[]}
          onAddImage={this.onAddImage}
          onDeleteImage={this.onDeleteImage}
          caption="Bundle Banner Background"
          // isError={
          //   this.props.recipe.isValidated && !this.props.category.image
          // }
        />
      </div>
    );
  }
}

BundleBanner.propTypes = {
  onChangeType: PropTypes.func,
  status: PropTypes.bool
};
