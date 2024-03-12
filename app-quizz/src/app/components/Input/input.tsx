type InputProps = {
    title: string,
    placeholder: string
} 

const Input = (props: InputProps) => {
    return <>
    <label className="block">
        <span className="block text-sm font-medium text-slate-700 text-justify pb-1">{props.title}</span>
        <input type="email" className="mt-1 px-3 py-2 bg-white border shadow-sm border-teal-600 placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-teal-400 block w-full rounded-md sm:text-sm focus:ring-1" placeholder={props.placeholder}/>
    </label>
  </>
}

export default Input;
