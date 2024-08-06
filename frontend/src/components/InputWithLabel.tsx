interface InputWithLabelProps {
    type: string;
    id: string;
    label: string;
    placeholder?: string;
    value: string;
    disabled?: boolean;
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWithLabel:React.FC<InputWithLabelProps> = ({type, id, label, placeholder, value, changeHandler,disabled = false}) => {
    return (
    <div className="w-full">
        <label htmlFor={id} className="block text-sm font-medium text-darkest_almond">{label}</label>

        <input 
            type={type} 
            className="bg- border border-gray-300 text-gray-900 rounded-lg w-full" 
            id={id} 
            placeholder={placeholder} 
            value={value} 
            onChange={changeHandler}
            required={true}
            disabled = {disabled}
            />
    </div>
    )
}

export default InputWithLabel