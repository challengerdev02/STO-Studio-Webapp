import { isMobile } from 'react-device-detect';
import { Button, ButtonProps, Col, Modal, Row } from 'antd';
import { get, isArray } from 'lodash';
import { DialogDivider } from './index.styled';

interface Action extends ButtonProps {
  key: string;
  text: string;
}

export type DialogActions = (Action | [Action, Action])[];

interface ShowProps {
  content: string;
  actions: DialogActions;
}

const isAcceptedType = (type: string) => {
  return ['link', 'text'].includes(type);
};

// Any because of antd's ButtonProps
const toAcceptedType = (type: string): any => {
  if (!isAcceptedType(type)) {
    return 'text';
  }
  return type;
};
const show = (config: ShowProps) => {
  const { content, actions } = config;
  const modal = Modal.info({});

  modal.update({
    title: null,
    bodyStyle: {
      // padding: '24px',
      padding: 0,
    },
    width: isMobile ? '80vw' : 400,
    centered: true,
    className: 'meta-dialog-container',
    content: (
      <div className="meta-flex meta-flex-col w-100">
        <div
          style={{
            padding: 24,
            fontSize: '1rem',
            color: 'var(--heading-color)',
            textAlign: 'center',
          }}
        >
          {content}
        </div>
        {actions.map((action, index) => {
          const key = isArray(action)
            ? `@@action-keymap: ${index}`
            : `@@action-keymap: ${action.key}`;
          const $action = (
            isArray(action) && action.length < 2 ? action[0] : action
          ) as Action;

          return (
            <div key={key} className={'w-100'}>
              <DialogDivider />
              {isArray(action) && action.length > 1 ? (
                <Row gutter={1}>
                  <Col
                    span={12}
                    style={{ borderRight: '1.5px solid var(--border)' }}
                  >
                    <Button
                      {...action[0]}
                      block
                      size={'small'}
                      type={toAcceptedType(get(action, '0.type', 'text'))}
                    >
                      {action[0].text}
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button
                      {...action[1]}
                      block
                      size={'small'}
                      type={toAcceptedType(get(action, '1.type', 'text'))}
                    >
                      {action[1]?.text}
                    </Button>
                  </Col>
                </Row>
              ) : (
                <Button
                  {...$action}
                  block
                  size={'small'}
                  type={toAcceptedType(get($action, 'type', 'text'))}
                >
                  {$action.text}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    ),
    icon: null,
    okButtonProps: {
      style: {
        display: 'none',
      },
    },
  });

  return modal;
};

export default {
  show,
};
