import { TextField } from "@mui/material";
import React from "react";
const TextFieldComponent = ({proId,label,name,handleChange, handleBlur,values, touched, desc, uom,errors, placeholder,type,variant
}) => {
    return (
        <>
            <TextField
                fullWidth
                autoComplete="off"
                variant={variant ? "outlined" : "standard"}
                disabled={proId ? true : false}
                type={type ? "date" : "text"}
                label={label}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values || ""}
                rows={desc ? 1 : 1}
                multiline={desc ? true : false}
                error={!!touched && !!errors}
                helperText={touched && errors}
            />
        </>
    );
};

export default TextFieldComponent;
