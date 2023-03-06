import { useTimer } from '../../../../hooks/useTimer';
import { CoverCountDown, SpacedFlexContainer } from '../container';
import { DropDownMenu } from '../menu';
import { isEmpty } from 'lodash';

export interface CoverComponentType {
  countDown?: string | undefined;
  menuItems: string[] | undefined;
  startDate: Date | string;
  endDate: Date | string;
  coverImg?: string;
}

export const CoverComponent = (
  menuItems: string[] | undefined,
  startDate: Date | string,
  endDate: Date | string,
  cardType?: string
) => {
  const { days, minutes, seconds, hours, isActive } = useTimer(
    startDate,
    endDate
  );
  // //console.log('counter', counter);
  return (
    <div>
      {!cardType && (
        <SpacedFlexContainer>
          <div>
            {isActive ? (
              <CoverCountDown
                role="count-down-text"
                className="count-down-text"
              >
                {days != '00'
                  ? `${days} days, ${hours} hours left`
                  : `${hours}:${minutes}:${seconds} left`}
              </CoverCountDown>
            ) : (
              <span> </span>
            )}
          </div>

          {!isEmpty(menuItems) && <DropDownMenu menuItems={menuItems} />}
        </SpacedFlexContainer>
      )}
    </div>
  );
};
