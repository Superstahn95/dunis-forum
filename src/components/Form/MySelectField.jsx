import { useField } from "formik";

function MySelectField({ label, directive, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col space-y-2 mb-4 text-gray-600 font-montserrat">
      <label htmlFor={props.id || props.name} className="text-gray-700">
        {label}
      </label>
      <select
        {...field}
        {...props}
        className="border border-gray-500 outline-none p-2  rounded-md"
      />
      <p className="text-sm ">{directive}</p>
      {meta.touched && meta.error ? (
        <div className="text-red-500  text-xs">{meta.error}</div>
      ) : null}
    </div>
  );
}

export default MySelectField;
