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
          <Button onClick={(): void => void dispatch(decrement(5))} variant="contained" color='error'>Decrement</Button>
          <Button onClick={(): void => void dispatch(increment(5))} variant="contained" color='primary'>Increment</Button>
        </ButtonGroup>
      </>
    );
  };