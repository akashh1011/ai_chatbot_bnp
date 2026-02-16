

const InputField = ({ label, name, type, value, onChange, placeholder }) => (
  <div className="space-y-1.5">
    <label className="ml-1 text-sm font-semibold text-gray-700">{label}</label>
    <input
      name={name}
      type={type}
      required
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 text-gray-900 transition-all border border-gray-200 outline-none rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500"
    />
  </div>
);

export default InputField;
