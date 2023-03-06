import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Space,
} from 'antd';
import { isMobile } from 'react-device-detect';
import { Fragment, ReactElement, SetStateAction, useState } from 'react';

import { AddAttributesForm } from '../add-attribute-form';
import styled from 'styled-components';
import { isFunction } from 'lodash';

interface Props {
  onFinish: (values: any) => void;
  form: FormInstance<any> | undefined;
  types: string[];
  subtitle?: string;
}

export const AttributeForm = (props: Props): ReactElement => {
  const { onFinish, form, types, subtitle } = props;
  return (
    <AddAttributesForm
      form={form}
      layout="vertical"
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item className="ant-form-text">
        <span aria-label="sub-title">{subtitle}</span>
      </Form.Item>
      <Form.List name="attributes">
        {(fields, { add, remove }) => (
          <Space direction={'vertical'} size={35} className={'w-100'}>
            {fields.map(({ key, name, ...restField }, index) => (
              <Fragment key={key}>
                <UnitRow
                  name={name}
                  {...restField}
                  index={index}
                  remove={remove}
                  types={types}
                  fields={fields}
                />
                {fields.length > 1 && key !== fields.length - 1 && <Line />}
              </Fragment>
            ))}

            <Form.Item>
              <Button
                type="primary"
                aria-label="add-more"
                // className="add-more-btn"
                ghost
                shape="round"
                onClick={() => add()}
              >
                Add {fields.length > 1 ? 'more' : 'attribute'}
              </Button>
            </Form.Item>
          </Space>
        )}
      </Form.List>
    </AddAttributesForm>
  );
};

export const UnitRow = (props: any): ReactElement => {
  const { name, remove, index, types = [], fields, ...restField } = props;
  const [valueType, setValueType] = useState('text');
  return (
    <div className="form-unit-row">
      <Row data-testid="unit-row" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={7} lg={7} xl={7}>
          <Form.Item
            className="ant-form-item-name  w-100"
            label={'NAME'}
            {...restField}
            name={[name, 'title']}
            rules={[{ message: 'Please input a title!', required: true }]}
          >
            <Input placeholder="Enter attribute title" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={7} lg={7} xl={7}>
          <Form.Item
            className="ant-form-item-type w-100"
            {...restField}
            name={[name, 'attributeType']}
            label={'TYPE'}
            rules={[{ message: 'Please input a type!', required: true }]}
          >
            <Select
              placeholder="Select a type"
              style={{ width: '100%' }}
              onSelect={(value: SetStateAction<string>) => setValueType(value)}
            >
              {types.map((value: string, key: string) => (
                <Select.Option key={key} value={value}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col
          xs={isMobile ? 24 : 20}
          sm={isMobile ? 24 : 20}
          md={8}
          lg={8}
          xl={8}
        >
          {(valueType == 'text' || valueType == 'number') && (
            <Form.Item
              className="ant-form-item-value  w-100"
              label={'VALUE'}
              {...restField}
              name={[name, 'value']}
              normalize={(value) => {
                if (isFunction(value?.toDate)) {
                  return value.toDate();
                }
                return value;
              }}
              rules={[{ message: 'Please input a value!', required: true }]}
            >
              <Input placeholder="Enter attribute value" />
            </Form.Item>
          )}
          {valueType == 'date' && (
            <Form.Item
              className="ant-form-item-value  w-100"
              label={'VALUE'}
              {...restField}
              name={[name, 'value']}
              rules={[{ message: 'Please input a value!', required: true }]}
            >
              <DatePicker />
            </Form.Item>
          )}
        </Col>

        <Col
          sm={isMobile ? 24 : 4}
          md={isMobile ? 24 : 4}
          lg={isMobile ? 24 : 2}
          xl={isMobile ? 24 : 2}
          className={'w-100'}
        >
          <Form.Item label={<div />} className={'w-100'}>
            <Button
              onClick={() => remove(name)}
              aria-label="remove-row"
              // className="remove-row"
              shape={isMobile ? 'round' : 'circle'}
              size="small"
              danger
              block={isMobile}
              icon={!isMobile && <i className="mc-close-line" />}
            >
              {isMobile ? 'Remove Attribute' : ' '}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

const Line = styled(Divider)`
  border: 1px solid var(--divider-color);
  margin: 5px 0 !important;
`;
