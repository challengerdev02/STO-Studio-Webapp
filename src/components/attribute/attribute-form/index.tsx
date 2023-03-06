import { Button, Form, FormInstance } from 'antd';
import React, { ReactElement } from 'react';
import { IsomorphicModal } from '../../isomorphic/modal';
import { FormFooter } from './add-attribute-form';
import { AttributeForm } from './attribute-form';

interface AttributeModalFormStyle {
  visible: boolean;
  title: string;
  subtitle?: string;
  types: string[];
  onFinish: (values: any) => void;
  handleCancel: () => void;
  form?: FormInstance;
}

export const AttributeModalForm = (
  props: AttributeModalFormStyle
): ReactElement => {
  const { onFinish, types, subtitle, handleCancel, form, ...rest } = props;
  const [defaultForm] = Form.useForm();
  return (
    <IsomorphicModal
      onCancel={handleCancel}
      width={'700px'}
      {...rest}
      footer={<ModalFooter form={form ?? defaultForm} />}
    >
      <AttributeForm
        types={types}
        onFinish={onFinish}
        form={form ?? defaultForm}
        subtitle={subtitle}
      />
    </IsomorphicModal>
  );
};

const ModalFooter = ({ form }: { form: FormInstance<any> }): ReactElement => {
  return (
    <FormFooter>
      <Button
        type="primary"
        aria-label="save-btn"
        shape="round"
        onClick={() => form.submit()}
      >
        Save
      </Button>
    </FormFooter>
  );
};
