import React, { FC, useEffect } from 'react'
import { Select } from 'antd'

const { Option } = Select

interface Props {
  data: CommonObjectType<string>[];
  placeholder?: string;
  rules?: Object[];
  value?: string;
  onChange?: (arg0: unknown) => void;
  width?: string | number;
  disabled?: boolean;
  onSearch?: () => void;
  defaultValue?: string | number;
}

const MySelect: FC<Props> = (props) => {
  const {
    data,
    rules,
    placeholder = '请输入搜索条件',
    value,
    onChange = () => { },
    width = '100%',
    disabled,
    onSearch,
    defaultValue
  } = props

  const handerChange = (val: string | number): void => {
    onChange(val)
  }

  useEffect(() => {
    //TODO 增加规则解析器
    //console.log(rules)
  }, [props.value])

  return (
    <Select
      allowClear
      disabled={disabled}
      onChange={handerChange}
      optionFilterProp="children"
      placeholder={placeholder}
      showSearch
      style={{ width }}
      value={value ? `${value}` : value}
      onSearch={onSearch}
      defaultValue={defaultValue}
    >
      {data.map((item) => (
        <Option key={item.key} title={item.name} value={item.key}>
          {item.name}
        </Option>
      ))}
    </Select>
  )
}

export default MySelect
