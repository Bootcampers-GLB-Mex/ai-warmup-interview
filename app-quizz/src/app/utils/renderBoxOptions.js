export default function renderBoxOptions(options, handleClick) {
  return options.map((option) => (
    <div
      key={option.id}
      className="p-10 bg-white mb-4 shadow-lg cursor-pointer"
      onClick={() => handleClick(option.id)}
    >
      <div className="pb-2 text-[#7C7C7C] text-xl">{option.title}</div>
      <div className="text-sm w-10/12">{option.description}</div>
    </div>
  ));
}
