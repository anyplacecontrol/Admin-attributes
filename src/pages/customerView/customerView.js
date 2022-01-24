import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as customerViewRedux from "../../redux/modules/customerViewRedux";
import { BaseView } from "../../components/BaseView/BaseView";
import { CustomerGeneral } from "./CustomerGeneral";
import { CustomerNotes } from "./CustomerNotes";
import { AddressPanel } from "../../components/AddressPanel/AddressPanel";
import { CustomerLoyalty } from "./CustomerLoyalty";
import { CustomerPaymentInfo } from "./CustomerPaymentInfo";
import { CustomerInteraction } from "./CustomerInteraction";
import { CustomerAutoCommunication } from "./CustomerAutoCommunication";
import { CustomerAdHocCommunication } from "./CustomerAdHocCommunication";
import { CustomerWooCommerce } from "./CustomerWooCommerce";
import { TablePanel } from "../../components/TablePanel/TablePanel";
import {
  COLUMN_DATE_PAID,
  ORDERS_BASIC_COLUMNS,
  CREDIT_CARDS_COLUMNS,
  COLUMN_CREDIT_EXPIRES
} from "../../consts/tableColumns";
import { IOrderView } from "../../redux/modules/orderViewRedux";
import * as routing from "../../redux/modules/routingRedux";
import { ROUTE_NAMES } from "../../consts/routeNames";
import { ordersActions } from "../../redux/modules/ordersRedux";

export class customerView_ extends React.Component {
  componentWillUnmount = async () => {
    //clear fetched orders for customer because too long list can be bad for RAM consuming
    if (!this.isOrderClick)
      await this.props.dispatch(ordersActions.resetState());
  };

  onOrderClick = item => {
    this.isOrderClick = true;
    this.props.dispatch(routing.goto_EditItem(ROUTE_NAMES.orderView, item.id));
  };

  //-------------------------------------------------------------------
  //For General Panel
  onChangeName = newValue => {
    this.props.dispatch(
      customerViewRedux.customerViewActions.changeName(newValue)
    );
  };

  onChangePrimaryEmail = newValue => {
    this.props.dispatch(
      customerViewRedux.customerViewActions.changeEmail(newValue)
    );
  };

  onChangeSecondaryEmails = newValue => {
    this.props.dispatch(
      customerViewRedux.customerViewActions.changeSecondaryEmails(newValue)
    );
  };

  onChangePrimaryPhone = newValue => {
    this.props.dispatch(
      customerViewRedux.customerViewActions.changePhone(newValue)
    );
  };

  onChangeSecondaryPhones = newValue => {
    this.props.dispatch(
      customerViewRedux.customerViewActions.changeSecondaryPhones(newValue)
    );
  };

  //----------------------------------------------------------------
  //For Billing Address

  onChange_Country = (newValue, addressFieldName) => {
    this.props.dispatch(
      customerViewRedux.customerViewActions.changeAddress_Country(
        newValue,
        addressFieldName
      )
    );
  };

  onChange_State = (newValue, addressFieldName) => {
    this.props.dispatch(
      customerViewRedux.customerViewActions.changeAddress_State(
        newValue,
        addressFieldName
      )
    );
  };

  onChange_City = (newValue, addressFieldName) => {
    this.props.dispatch(
      customerViewRedux.customerViewActions.changeAddress_City(
        newValue,
        addressFieldName
      )
    );
  };

  onChange_Zip = (newValue, addressFieldName) => {
    this.props.dispatch(
      customerViewRedux.customerViewActions.changeAddress_Zip(
        newValue,
        addressFieldName
      )
    );
  };

  onChange_Street = (newValue, addressFieldName) => {
    this.props.dispatch(
      customerViewRedux.customerViewActions.changeAddress_Street(
        newValue,
        addressFieldName
      )
    );
  };

  onChange_Street2 = (newValue, addressFieldName) => {
    this.props.dispatch(
      customerViewRedux.customerViewActions.changeAddress_Street2(
        newValue,
        addressFieldName
      )
    );
  };

  onChange_Company = (newValue, addressFieldName) => {
    this.props.dispatch(
      customerViewRedux.customerViewActions.changeAddress_Company(
        newValue,
        addressFieldName
      )
    );
  };

  onChange_FirstName = (newValue, addressFieldName) => {
    this.props.dispatch(
      customerViewRedux.customerViewActions.changeAddress_FirstName(
        newValue,
        addressFieldName
      )
    );
  };

  onChange_LastName = (newValue, addressFieldName) => {
    this.props.dispatch(
      customerViewRedux.customerViewActions.changeAddress_LastName(
        newValue,
        addressFieldName
      )
    );
  };

  onChange_Email = (newValue, addressFieldName) => {
    this.props.dispatch(
      customerViewRedux.customerViewActions.changeAddress_Email(
        newValue,
        addressFieldName
      )
    );
  };

  onChange_Phone = (newValue, addressFieldName) => {
    this.props.dispatch(
      customerViewRedux.customerViewActions.changeAddress_Phone(
        newValue,
        addressFieldName
      )
    );
  };

  //-------------------------------------------------------------------
  //For customer Notes

  onChangeAdditionalInfo = newValue => {
    this.props.dispatch(
      customerViewRedux.customerViewActions.changeAdditionalInfo(newValue)
    );
  };
  onChangeChildrens = newValue => {
    this.props.dispatch(
      customerViewRedux.customerViewActions.changeChildrens(newValue)
    );
  };
  onChangePets = newValue => {
    this.props.dispatch(
      customerViewRedux.customerViewActions.changePets(newValue)
    );
  };
  onChangePartners = newValue => {
    this.props.dispatch(
      customerViewRedux.customerViewActions.changePartners(newValue)
    );
  };
  onChangeAllergies = newValue => {
    this.props.dispatch(
      customerViewRedux.customerViewActions.changeAllergies(newValue)
    );
  };

  //-------------------------------------------------------------------

  render() {
    return (
      <BaseView
        viewName="Customer"
        actionsProvider={customerViewRedux.customerViewActions}
      >
        <CustomerGeneral
          customer={this.props.customer}
          onChangeName={this.onChangeName}
          onChangePrimaryEmail={this.onChangePrimaryEmail}
          onChangeSecondaryEmails={this.onChangeSecondaryEmails}
          onChangePrimaryPhone={this.onChangePrimaryPhone}
          onChangeSecondaryPhones={this.onChangeSecondaryPhones}
        />

        {/* --Billing Address-- */}
        <AddressPanel
          caption="Billing Information"
          address={this.props.customer.billingAddress || {}}
          onChangeCountry={value =>
            this.onChange_Country(value, "billingAddress")
          }
          onChangeState={value => this.onChange_State(value, "billingAddress")}
          onChangeCity={value => this.onChange_City(value, "billingAddress")}
          onChangeZip={value => this.onChange_Zip(value, "billingAddress")}
          onChangeStreet={value =>
            this.onChange_Street(value, "billingAddress")
          }
          onChangeStreet2={value =>
            this.onChange_Street2(value, "billingAddress")
          }
          onChangeCompany={value =>
            this.onChange_Company(value, "billingAddress")
          }
          onChangeFirstName={value =>
            this.onChange_FirstName(value, "billingAddress")
          }
          onChangeLastName={value =>
            this.onChange_LastName(value, "billingAddress")
          }
          onChangeEmail={value => this.onChange_Email(value, "billingAddress")}
          onChangePhone={value => this.onChange_Phone(value, "billingAddress")}
        />

        {/* --Shipping Address-- */}
        <AddressPanel
          caption="Shipping Information"
          address={this.props.customer.shippingAddress || {}}
          onChangeCountry={value =>
            this.onChange_Country(value, "shippingAddress")
          }
          onChangeState={value => this.onChange_State(value, "shippingAddress")}
          onChangeCity={value => this.onChange_City(value, "shippingAddress")}
          onChangeZip={value => this.onChange_Zip(value, "shippingAddress")}
          onChangeStreet={value =>
            this.onChange_Street(value, "shippingAddress")
          }
          onChangeStreet2={value =>
            this.onChange_Street2(value, "shippingAddress")
          }
          onChangeCompany={value =>
            this.onChange_Company(value, "shippingAddress")
          }
          onChangeFirstName={value =>
            this.onChange_FirstName(value, "shippingAddress")
          }
          onChangeLastName={value =>
            this.onChange_LastName(value, "shippingAddress")
          }
          onChangeEmail={value => this.onChange_Email(value, "shippingAddress")}
          onChangePhone={value => this.onChange_Phone(value, "shippingAddress")}
        />

        <CustomerNotes
          notes={this.props.customer.notes || {}}
          onChangeAdditionalInfo={this.onChangeAdditionalInfo}
          onChangeChildrens={this.onChangeChildrens}
          onChangePets={this.onChangePets}
          onChangePartners={this.onChangePartners}
          onChangeAllergies={this.onChangeAllergies}
        />

        <TablePanel
          caption="Customer's Cards (Emulated)"
          items={this.props.customer.creditCards || []}
          sortBy={COLUMN_CREDIT_EXPIRES}
          columns={CREDIT_CARDS_COLUMNS}
        />

        <CustomerPaymentInfo 
          paymentInfo = {this.props.customer.paymentInfo || {}}
        />

        <CustomerLoyalty loyaltyInfo={this.props.customer.loyaltyInfo || {}} />

        <TablePanel
          caption="Customer's Orders"
          items={this.props.orders || []}
          onRowClick={this.onOrderClick}
          sortBy={COLUMN_DATE_PAID}
          columns={ORDERS_BASIC_COLUMNS}
        />

        <CustomerInteraction/>

        <CustomerAutoCommunication/>

        <CustomerAdHocCommunication/>

        <CustomerWooCommerce/>

      </BaseView>
    );
  }
}

customerView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  customer: customerViewRedux.ICustomerView,
  orders: PropTypes.arrayOf(IOrderView)
};

function mapStateToProps(state) {
  return {
    customer: state.customerView,
    orders: state.orders.items
  };
}

export const customerView = connect(mapStateToProps)(customerView_);
