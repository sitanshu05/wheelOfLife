
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
        <div>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-font_brown dark:text-white">{label}</label>
            <input type={type} id={id} value={value} disabled={disabled} placeholder={placeholder} onChange={changeHandler} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-div_orange block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-div_orange" required />
        </div>

    )
}

export default InputWithLabel