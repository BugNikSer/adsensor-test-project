import { Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef } from "react";

const DialogTransition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default DialogTransition
