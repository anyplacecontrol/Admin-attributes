import React from "react";
import PropTypes from "prop-types";
import {SelectBox} from "../SelectBox/SelectBox";

export class Controls extends React.Component {
  render() {
    let filterBtnCls = this.props.isFilterVisible
      ? "filter__button flex active animated"
      : "filter__button flex animated";

    return (
      <>
        {/* -- Nav before table-- */}
        <div className="main-nav flex w100 animated">
          {(this.props.onDeleteSelectedItems || this.props.onDisableSelectedItems) &&
          <div className="main-nav__left flex animated">
            <div className="filter__select animated">
              <SelectBox
                text="Actions"
                items={[
                  this.props.onDeleteSelectedItems ?
                    {text: "Delete", onClick: this.props.onDeleteSelectedItems} : null,
                  this.props.onDisableSelectedItems ?
                    {text: "Disable", onClick: this.props.onDisableSelectedItems} : null,
                  this.props.onEnableSelectedItems ?
                    {text: "Enable", onClick: this.props.onEnableSelectedItems} : null,
                ]}
              />
            </div>

            <div className="filter__count animated">
              {this.props.maxItemsQty} items found ({this.props.selectedItemsQty} selected)
            </div>

          </div>
          }

          <div className="main-nav__right flex animated">
            <button className="main-nav__refresh animated" onClick={this.props.onRefreshClick}/>
            {/* -- click ".filter__button" -- toggle class "active" and toggle class "hidden" for .filter__body--
            -- added class ".flex"--
            -- changed structure-- */}
            {this.props.onFilterClick &&
            <div className={filterBtnCls} onClick={this.props.onFilterClick}>
              <div className="filter__button--icon animated"/>
              <div className="filter__button--text animated">Filter</div>
            </div>
            }

            {this.props.onAddItemClick && (
              <button
                className="add animated"
                onClick={this.props.onAddItemClick}
              >
                Add Item
              </button>
            )}


          </div>
        </div>
      </>
    );
  }
}

Controls.propTypes = {
  onFilterClick: PropTypes.func,
  onAddItemClick: PropTypes.func,
  onDeleteSelectedItems: PropTypes.func,
  onDisableSelectedItems: PropTypes.func,
  onEnableSelectedItems: PropTypes.func,
  onRefreshClick: PropTypes.func,
  isFilterVisible: PropTypes.bool.isRequired,
  maxItemsQty: PropTypes.number.isRequired,
  selectedItemsQty: PropTypes.number.isRequired
};
