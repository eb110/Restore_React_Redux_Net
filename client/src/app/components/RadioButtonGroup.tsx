import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface Props{
    options: option[];
    onChange: (event: React.SyntheticEvent<Element, Event>) => void;
    selectedValue: string;
}

interface option {
    value: string;
    label: string;
}

export const RadioButtonGroup = (props: Props): React.ReactNode => {

  return (
    <>
      <FormControl>
        <RadioGroup onChange={(event): void => props.onChange(event)} value={props.selectedValue}>
          {props.options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option.value}
              control={<Radio />}
              label={option.label}        
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
};
