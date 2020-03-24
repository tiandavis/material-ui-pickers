import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Popper, { PopperProps } from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { WrapperProps } from './Wrapper';
import { InnerMobileWrapperProps } from './MobileWrapper';
import { WrapperVariantContext } from './WrapperVariantContext';
import { KeyboardDateInput } from '../_shared/KeyboardDateInput';
import { useGlobalKeyDown, keycode } from '../_shared/hooks/useKeyDown';

export interface InnerDesktopPopperWrapperProps {
  /** Popover props passed to material-ui Popover */
  PopperProps?: Partial<PopperProps>;
}

export interface DesktopWrapperProps
  extends InnerDesktopPopperWrapperProps,
    WrapperProps,
    Partial<InnerMobileWrapperProps> {}

export const DesktopPopperWrapper: React.FC<DesktopWrapperProps> = ({
  open,
  wider,
  children,
  PopperProps,
  onClear,
  onDismiss,
  onSetToday,
  onAccept,
  showTabs,
  DateInputProps,
  okLabel,
  cancelLabel,
  clearLabel,
  todayLabel,
  showTodayButton,
  clearable,
  DialogProps,
  PureDateInputComponent,
  KeyboardDateInputComponent = KeyboardDateInput,
  ...other
}) => {
  const ref = React.useRef<HTMLButtonElement>(null);

  useGlobalKeyDown(open, {
    [keycode.Esc]: onDismiss,
  });

  return (
    <WrapperVariantContext.Provider value="desktop">
      <KeyboardDateInputComponent {...other} {...DateInputProps} inputRef={ref} />

      <Popper
        placement="bottom"
        open={open}
        // @ts-ignore
        anchorEl={ref.current}
        {...PopperProps}
      >
        <ClickAwayListener onClickAway={onDismiss}>
          <Paper>{children}</Paper>
        </ClickAwayListener>
      </Popper>
    </WrapperVariantContext.Provider>
  );
};