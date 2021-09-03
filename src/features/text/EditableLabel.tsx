
import { useEffect, useState } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import './buttonReset.sass';
interface Props {
    value: string;
    onSave: (newValue: string) => any
    className?: string;
}
export default function EditableLabel(props: Props) {
    const { className, onSave, } = props
    const [value, setValue] = useState(props.value)
    const [editing, setEditing] = useState<boolean>(false)
    function onSubmit(event: React.FormEvent) {
        event.preventDefault()
        event.stopPropagation()
        onSave(value);
        setEditing(false)
    }
    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        event.stopPropagation()
        onSave(event.target.value);
        setValue(event.target.value)
    }
    useEffect(() => {
        setValue(props.value)
    }, [props.value])
    return editing ?
        <Form onSubmit={onSubmit}>
            <InputGroup className="mb-0">
                <FormControl autoFocus placeholder="Team Name" onChange={onChange} as={'input'} onBlur={() => setEditing(false)} value={value} />
            </InputGroup>
        </Form>
        : <h4 className={className || ``} onClick={() => setEditing(true)}>{value||`No Team Name`} <i className="bi bi-pencil-fill fs-5"></i></h4>
}