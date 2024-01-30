import {
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

interface Props {
  options: string[];
  formLabel?: string;
  selectedValues: string[];
  onChange: (options: string[]) => void;
}

export const CheckboxButtons = (props: Props): React.ReactNode => {
  const handleChange = (option: string): void => {
    const arr = [...props.selectedValues];
    const index = arr.indexOf(option);
    if (index === -1) arr.push(option);
    else arr.splice(index, 1);
    props.onChange(arr);
  };

  return (
    <>
      {props.formLabel && (
        <FormLabel component="legend">{props.formLabel}</FormLabel>
      )}
      <FormGroup>
        {props.options.map((option, index) => (
          <FormControlLabel
            checked={props.selectedValues.includes(option)}
            onChange={(): void => handleChange(option)}
            key={index}
            control={<Checkbox />}
            label={option}
            name={`cb_${option}_${index}`}
          />
        ))}
      </FormGroup>
    </>
  );
};
