import type{  FC, ReactNode, SyntheticEvent } from 'react'

export type FormDataType = Record<string, string>

interface FormInterface {
    children: ReactNode;
    className: string;
    onValue?: (value: FormDataType) => void
}
const Form: FC<FormInterface> = ({ children, className, onValue }) => {

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget;
        const formdata = new FormData(form)
        const data: FormDataType = {}

        formdata.forEach((value, name) => {
            data[name] = value.toString()
        })
        
        if(onValue) onValue(data);
    }
    return (
        <form className={className} onSubmit={handleSubmit}>
            {children}
        </form>
    )
}

export default Form