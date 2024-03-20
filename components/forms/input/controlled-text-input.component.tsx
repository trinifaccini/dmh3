import { Box, Grid } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import { FC, useState } from "react";
import {  useController, useFormContext } from "react-hook-form";
 

type ControlledTextInputProps = {
	isNotGrid?: boolean,
	width?: number,
    name: string,
    placeholder: string,
    defaultValue?: string,
	type: string,
	id?: string,
	registerPage?: boolean
	onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => void;
	handleChangeCustom?: (value: string) => void,
	onKeyPress?: (event: KeyboardEvent) => void;
}

const ControlledTextInput: FC<ControlledTextInputProps> = ({isNotGrid, width, name, placeholder, defaultValue, type, id, onFocus, handleChangeCustom, onKeyPress, registerPage}: ControlledTextInputProps) => {

	const {control} = useFormContext(); 
	const [valor, setValor] = useState(defaultValue);

	const { field: {onChange, value, ref}, formState: {errors} } =  useController<Record<string,string>>({
		name: name, // Si falla, name: `${name}` as const
		control,
		defaultValue,
	})
   
	
 const handleChange = (e: any) => {
	onChange(e)
	setValor(e.target.value)
	handleChangeCustom && handleChangeCustom(e.target.value)
	console.log(e.target.value)
 }

 const handleKeyPress = (e: any) => {
	onKeyPress && onKeyPress(e)
 }
 
	if(isNotGrid) {
		return (
			<TextField
				data-testid={id}
				name={name}
				onChange={handleChange}
				onKeyPress={handleKeyPress}
				value={defaultValue ? valor : value}
				inputRef={ref}
				error={!!errors[name]}
				helperText={`${errors[name]?.message || ''}`}
				type={type}
				placeholder={placeholder}
				sx={{backgroundColor: registerPage ? 'primary.main' : 'secondary.light', borderRadius: '10px',
				[`& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input`]: {backgroundColor: "white"} }}
				fullWidth
				inputProps={{
					autoComplete: 'off'
				 }}
				onFocus={onFocus ? (e) => onFocus(e): undefined}
			/>

		)
	}

	return (
		<Grid item mobile={width}>
			<TextField
				data-testid={id}
				name={name}
				onChange={handleChange}
				value={value}
				inputRef={ref}
				error={!!errors[name]}
				helperText={`${errors[name]?.message || ''}`}
				type={type}
				placeholder={placeholder}
				sx={{backgroundColor: registerPage ? 'primary.main' : 'secondary.light', borderRadius: '10px', border: 'none',
				// [`& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input`]: {backgroundColor: "white"} 
				[`& .MuiInputBase-input`]: {backgroundColor: "white"} 
				}}
				fullWidth
				inputProps={{
					autoComplete: 'off'
				 }}
				onFocus={onFocus ? (e) => onFocus(e): undefined}
			/>
		</Grid>
  );
}

export default ControlledTextInput;
