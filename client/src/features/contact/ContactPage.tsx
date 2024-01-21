/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";

export const ContactPage = (): React.ReactNode => {

  const dispatch = useAppDispatch();
  const {data, title } = useAppSelector(state => state.counter)

    return (
      <>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="h5">{data}</Typography>
        <ButtonGroup>
          <Button onClick={(): void => dispatch(decrement(5))} variant="contained" color='error'>Decrement</Button>
          <Button onClick={(): void => dispatch(increment(5))} variant="contained" color='primary'>Increment</Button>
        </ButtonGroup>
      </>
    );
  };