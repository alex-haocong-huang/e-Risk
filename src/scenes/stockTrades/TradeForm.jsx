/*
 * @Author: alex.huang 
 * @Date: 2019-12-23 15:13:27 
 * @Last Modified by: alex.huang
 * @Last Modified time: 2019-12-24 11:53:33
 */
import { Form, InputNumber, Button, notification, Input } from "antd";
import React from "react";
import "./TradeForm.css";

/**
 * check if there is any error of form
 * @param {*} fieldsError
 */
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class TradeForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  /** handle the whole trade form submmition */
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.addNewTrade(values);
        this.openNotificationWithIcon("success");
      }
    });
  };

  state = {
    data: [],
    value: "",
    quantities: 0,
    fetching: false
  };

  //handle company selection change
  handleChange = value => {
    this.setState({
      value,
      data: [],
      fetching: false
    });
  };

  //quantities Validator
  quantitiesValidator = (rule, val, callback) => {
    //  to be refactored in future
    if (val === 0) {
      callback("0 is not allowed.");
    } else if (!val) {
      callback("Please input quantity.");
    } else if (!parseFloat(val)) {
      callback("Only number is allowed.");
    } else if (parseFloat(val) > 10000000000) {
      callback("The maximun number is 10000000000.");
    } else if (parseFloat(val) < -10000000000) {
      callback("The minimum number is -10000000000.");
    } else {
      callback();
    }
  };

  // show notification
  openNotificationWithIcon = type => {
    notification[type]({
      message: "Stock Trade",
      description: "The trade has been added successfully!"
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const companyError = isFieldTouched("company") && getFieldError("company");
    const quantitiesError =
      isFieldTouched("quantities") && getFieldError("quantities");
    return (
      <div className="trade-form">
        <h1>Add new trade</h1>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item
            validateStatus={companyError ? "error" : ""}
            help={companyError || ""}
          >
            {getFieldDecorator("company", {
              rules: [{ required: true, message: "Please input company name." }]
            })(<Input placeholder="Company" />)}
          </Form.Item>
          <Form.Item
            validateStatus={quantitiesError ? "error" : ""}
            help={quantitiesError || ""}
          >
            {getFieldDecorator("quantities", {
              rules: [
                {
                  validator: this.quantitiesValidator
                }
              ]
            })(
              <InputNumber
                className="quantity-input"
                precision={3}
                type="text"
                placeholder="Quantity"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default TradeForm;
