import { Form, Select, Spin, InputNumber, Button, notification } from "antd";
import React from "react";
import CompanyService from "../../services/CompanyService";
import debounce from "lodash/debounce";
import "./TradeForm.css";

const { Option } = Select;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class TradeForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
    this.fetchCompanies = debounce(this.fetchCompanies, 800);
  }

  // handle the whole trade form submmition
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

  //fetch Companies when user input on company field
  fetchCompanies = async () => {
    let service = new CompanyService();
    this.setState({ data: [], fetching: true });
    let results = await service.getCompanies();
    if (results === null) return;

    const data = results.map(company => ({
      text: company,
      value: company
    }));
    this.setState({ data, fetching: false });
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
    if (val === 0) {
      callback("0 is not allowed!");
    }
    callback();
  };

  // show notification
  openNotificationWithIcon = type => {
    notification[type]({
      message: "Stock Trade",
      description: "The trade has been added successfully!"
    });
  };

  render() {
    const { fetching, data } = this.state;
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const companyError = isFieldTouched("Company") && getFieldError("Company");
    const quantitiesError =
      isFieldTouched("Quantities") && getFieldError("Quantities");
    return (
      <div className="trade-form">
        <h1>Add new trade</h1>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item
            validateStatus={companyError ? "error" : ""}
            help={companyError || ""}
          >
            {getFieldDecorator("Company", {
              rules: [
                {
                  required: true,
                  message: "Please select a company!",
                  type: "string"
                }
              ]
            })(
              <Select
                showSearch
                allowClear
                data-testid="Select-Company"
                style={{ width: 200 }}
                placeholder="Select a company"
                notFoundContent={fetching ? <Spin size="small" /> : null}
                onSearch={this.fetchCompanies}
                onChange={this.handleChange}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {data.map(d => (
                  <Option key={d.value}>{d.text}</Option>
                ))}
                <Option key="HSBC">HSBC</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            validateStatus={quantitiesError ? "error" : ""}
            help={quantitiesError || ""}
          >
            {getFieldDecorator("Quantities", {
              rules: [
                {
                  required: true,
                  message: "Please input quantities!",
                  type: "number"
                },
                {
                  validator: this.quantitiesValidator
                }
              ]
            })(<InputNumber type="text" placeholder="Quantities" />)}
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
