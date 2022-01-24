import React from "react";

export class BundleProduct extends React.Component {
  getTotalQty = () => {
    // return this.props.order.order_items.length;
  };

  renderRows = () => {};

  render() {
    return (
      <div className="block-set__box flex animated">
        {/* -- add class ".no-padding"-- */}
        <div className="block-set__inner flex w100 no-padding animated">
          <div
            className="product__table animated"
            style={{ minHeight: "130px" }}
          >
            <div className="product__table--inner flex animated">
              <div className="product__table--thead animated">
                <div className="product__table--tr main flex animated">
                  {/* -- add class ".v2"-- */}
                  <div className="name v2 animated">
                    <div className="product__table--td animated">Product</div>
                  </div>
                  <div className="price animated">
                    <div className="product__table--td animated">Price</div>
                  </div>
                  <div className="price animated">
                    <div className="product__table--td animated">Q-ty</div>
                  </div>
                  <div className="price animated">
                    <div className="product__table--td animated">Subtotal</div>
                  </div>
                  <div className="price animated">
                    <div className="product__table--td animated">Discount</div>
                  </div>
                  <div className="price animated">
                    <div className="product__table--td animated">Total</div>
                  </div>
                </div>
                <div className="product__table--tr main flex animated">
                  No Products in the bundle
                </div>
                {this.renderRows()}
              </div>
            </div>
          </div>
        </div>
        <div className="block-set__bottom flex w100 animated">
          <div
            className="product__table animated"
            style={{ minHeight: "90px"}}
          >
            <div className="product__table--inner flex animated" >
              <div className="product__table--thead animated">
                <div className="product__table--tr main flex animated" style={{background:"#DCD9CB", borderBottom:"none"}}>
                  {/* -- add class ".v2"-- */}
                  <div className="name v2 animated">
                    <div className="product__table--td animated"></div>
                  </div>
                  <div className="price animated">
                    <div className="product__table--td animated"></div>
                  </div>
                  <div className="price animated">
                    <div className="product__table--td animated">Q-ty</div>
                    <div className="product__table--td animated" style={{color:"#2f3d57"}}>0</div>
                  </div>
                  <div className="price animated">
                    <div className="product__table--td animated">Subtotal</div>
                    <div className="product__table--td animated" style={{color:"#2f3d57"}}>$00.00</div>
                  </div>
                  <div className="price animated">
                    <div className="product__table--td animated">Discount</div>
                    <div className="product__table--td animated" style={{color:"#2f3d57"}}>0%</div>
                  </div>
                  <div className="price animated">
                    <div className="product__table--td animated">Total</div>
                    <div className="product__table--td animated" style={{color:"#2f3d57"}}>$00.00</div>
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

BundleProduct.propTypes = {
};
