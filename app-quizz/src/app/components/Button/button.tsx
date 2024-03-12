type ButtonProps = {
    title: string
} 

const Button = (props: ButtonProps) => {
    return <button className="bg-teal-900 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded">
            {props.title}
        </button>
}

export default Button;
