import React from "react";
import PropTypes from "prop-types";
import * as consts from "../../consts/constants";
import { SelectBox } from "../../components/SelectBox/SelectBox";
import * as dataFuncs from "../../utils/dataFuncs";

export class UsersTypes extends React.Component {
  onChange = () => {};
  render() {
    return (
      <div className="table permissions animated">
        <div className="table__inner flex animated">
          <div className="table__thead animated">
            <div className="table__tr main flex animated">
              <div className="category v2 animated">
                <div className="sort flex animated">Permissions</div>
              </div>
              <div className="status animated">
                <div className="sort flex animated">Dashboard</div>
              </div>
              <div className="date animated">
                <div className="sort flex animated">Reports</div>
              </div>
              <div className="category animated">
                <div className="sort flex animated">Products</div>
              </div>
              <div className="location animated">
                <div className="sort flex animated">Stores</div>
              </div>
              <div className="weight animated">
                <div className="sort flex animated">Kiosks</div>
              </div>
              <div className="price animated">
                <div className="sort flex animated">Machines</div>
              </div>
              <div className="prod-quantity animated">
                <div className="sort flex animated">Customers</div>
              </div>
              <div className="kiosk-table animated">
                <div className="sort flex animated">Discounts</div>
              </div>
              <div className="machine animated">
                <div className="sort flex animated">Logs</div>
              </div>
              <div className="store animated">
                <div className="sort flex animated">Taxes</div>
              </div>
              <div className="store animated">
                <div className="sort flex animated">Recipes</div>
              </div>
              <div className="store animated">
                <div className="sort flex animated">Help</div>
              </div>
            </div>
          </div>
          <div className="table__tbody animated">
            <div className="table__tr permissions__tr flex animated">
              <div className="category v2 animated">
                <div className="table__td animated">Executive manager</div>
              </div>
              <div className="status animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-1-1"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-1-1"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="date animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-1-2"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-1-2"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="category animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-1-3"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-1-3"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="location animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-1-4"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-1-4"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="weight animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-1-5"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-1-5"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="price animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-1-6"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-1-6"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="prod-quantity animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-1-7"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-1-7"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="kiosk-table animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-1-8"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-1-8"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="machine animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-1-9"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-1-9"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-1-10"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-1-10"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-1-11"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-1-11"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-1-12"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-1-12"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table__tr permissions__tr flex animated">
              <div className="category v2 animated">
                <div className="table__td animated">Finance manager</div>
              </div>
              <div className="status animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-2-1"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-2-1"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="date animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-2-2"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-2-2"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="category animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-2-3"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-2-3"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="location animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-2-4"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-2-4"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="weight animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-2-5"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-2-5"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="price animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-2-6"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-2-6"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="prod-quantity animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-2-7"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-2-7"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="kiosk-table animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-2-8"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-2-8"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="machine animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-2-9"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-2-9"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-2-10"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-2-10"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-2-11"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-2-11"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-2-12"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-2-12"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table__tr permissions__tr flex animated">
              <div className="category v2 animated">
                <div className="table__td animated">Retail manager</div>
              </div>
              <div className="status animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-3-1"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-3-1"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="date animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-3-2"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-3-2"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="category animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-3-3"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-3-3"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="location animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-3-4"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-3-4"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="weight animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-3-5"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-3-5"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="price animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-3-6"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-3-6"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="prod-quantity animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-3-7"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-3-7"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="kiosk-table animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-3-8"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-3-8"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="machine animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-3-9"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-3-9"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-3-10"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-3-10"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-3-11"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-3-11"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-3-12"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-3-12"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table__tr permissions__tr flex animated">
              <div className="category v2 animated">
                <div className="table__td animated">Retail operator</div>
              </div>
              <div className="status animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-4-1"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-4-1"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="date animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-4-2"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-4-2"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="category animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-4-3"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-4-3"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="location animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-4-4"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-4-4"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="weight animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-4-5"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-4-5"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="price animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-4-6"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-4-6"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="prod-quantity animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-4-7"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-4-7"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="kiosk-table animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-4-8"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-4-8"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="machine animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-4-9"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-4-9"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-4-10"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-4-10"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-4-11"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-4-11"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-4-12"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-4-12"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table__tr permissions__tr flex animated">
              <div className="category v2 animated">
                <div className="table__td animated">Security manager</div>
              </div>
              <div className="status animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-5-1"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-5-1"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="date animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-5-2"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-5-2"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="category animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-5-3"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-5-3"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="location animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-5-4"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-5-4"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="weight animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-5-5"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-5-5"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="price animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-5-6"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-5-6"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="prod-quantity animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-5-7"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-5-7"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="kiosk-table animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-5-8"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-5-8"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="machine animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-5-9"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-5-9"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-5-10"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-5-10"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-5-11"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-5-11"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-5-12"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-5-12"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table__tr permissions__tr flex animated">
              <div className="category v2 animated">
                <div className="table__td animated">Production manager</div>
              </div>
              <div className="status animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-6-1"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-6-1"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="date animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-6-2"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-6-2"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="category animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-6-3"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-6-3"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="location animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-6-4"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-6-4"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="weight animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-6-5"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-6-5"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="price animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-6-6"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-6-6"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="prod-quantity animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-6-7"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-6-7"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="kiosk-table animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-6-8"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-6-8"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="machine animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-6-9"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-6-9"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-6-10"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-6-10"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-6-11"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-6-11"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-6-12"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-6-12"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table__tr permissions__tr flex animated">
              <div className="category v2 animated">
                <div className="table__td animated">
                  Transportation Coordinator
                </div>
              </div>
              <div className="status animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-7-1"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-7-1"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="date animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-7-2"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-7-2"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="category animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-7-3"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-7-3"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="location animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-7-4"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-7-4"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="weight animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-7-5"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-7-5"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="price animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-7-6"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-7-6"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="prod-quantity animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-7-7"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-7-7"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="kiosk-table animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-7-8"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-7-8"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="machine animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-7-9"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-7-9"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-7-10"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-7-10"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-7-11"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-7-11"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-7-12"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-7-12"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table__tr permissions__tr flex animated">
              <div className="category v2 animated">
                <div className="table__td animated">Driver</div>
              </div>
              <div className="status animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-8-1"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-8-1"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="date animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-8-2"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-8-2"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="category animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-8-3"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-8-3"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="location animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-8-4"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-8-4"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="weight animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-8-5"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-8-5"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="price animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-8-6"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-8-6"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="prod-quantity animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-8-7"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-8-7"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="kiosk-table animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-8-8"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-8-8"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="machine animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-8-9"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-8-9"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-8-10"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-8-10"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-8-11"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-8-11"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-8-12"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-8-12"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table__tr permissions__tr flex animated">
              <div className="category v2 animated">
                <div className="table__td animated">Marketing manager</div>
              </div>
              <div className="status animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-9-1"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-9-1"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="date animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-9-2"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-9-2"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="category animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-9-3"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-9-3"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="location animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-9-4"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-9-4"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="weight animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-9-5"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-9-5"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="price animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-9-6"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-9-6"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="prod-quantity animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-9-7"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-9-7"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="kiosk-table animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-9-8"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-9-8"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="machine animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-9-9"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-9-9"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-9-10"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-9-10"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-9-11"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-9-11"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-9-12"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-9-12"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table__tr permissions__tr flex animated">
              <div className="category v2 animated">
                <div className="table__td animated">Tech Support manager</div>
              </div>
              <div className="status animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-10-1"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-10-1"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="date animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-10-2"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-10-2"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="category animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-10-3"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-10-3"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="location animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-10-4"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-10-4"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="weight animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-10-5"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-10-5"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="price animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-10-6"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-10-6"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="prod-quantity animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-10-7"
                        type="checkbox"
                      />
                      
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-10-7"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="kiosk-table animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-10-8"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-10-8"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="machine animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-10-9"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-10-9"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-10-10"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-10-10"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-10-11"
                        type="checkbox"
                        defaultChecked=""
                      />
                      <label
                        className="checkbox__label animated checked"
                        htmlFor="permissions-10-11"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store animated">
                <div className="table__td animated">
                  <div className="checkbox__box animated">
                    <div className="table__td animated">
                      <input
                        className="checkbox__input animated"
                        id="permissions-10-12"
                        type="checkbox"
                      />
                      <label
                        className="checkbox__label animated"
                        htmlFor="permissions-10-12"
                      ></label>
                    </div>
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

UsersTypes.propTypes = {
  // user: PropTypes.any,
  // onChangeType: PropTypes.func,
  // onChangeStoreManagement: PropTypes.func
};
