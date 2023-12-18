export const Input = props => {
  const { type, options, ...restProps } = props;

  const inputs = {
    text: <input {...props} />,
    email: <input {...props} />,
    date: <input {...props} />,
    select: (
      <select {...restProps}>
        {options?.map(element => (
          <option
            key={crypto.randomUUID()}
            value={element.value}
            defaultChecked={element.defaultChecked}
          >
            {element.label}
          </option>
        ))}
      </select>
    ),
    textarea: <textarea {...props} />,
  };

  return inputs[type];
};
