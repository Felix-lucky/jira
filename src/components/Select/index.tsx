import React from "react";
import { Select } from "antd";
import { useUsers } from "utils/users";

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<
    SelectProps,
    "value" | "onChange" | "defaultOptionsName" | "options"
  > {
  value?: string | number | undefined | null;
  onChange?: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));

export const IdSelect = ({
  value,
  onChange,
  defaultOptionName,
  options,
  ...restProps
}: IdSelectProps) => {
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange?.(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName && (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      )}
      {options?.map((option) => (
        <Select.Option value={option.id} key={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const UsersSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();
  return <IdSelect options={users || []} {...props} />;
};

export default UsersSelect;
