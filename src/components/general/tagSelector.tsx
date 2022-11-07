import React from "react";
import Select, { GroupBase, Props } from "react-select"
import style from "../../../styles/dropdownSelect.module.scss"

interface ITagSelectProps {
  tags: string[],
  className?: string;
}

export default function TagSelect(props: Props<{ value: string; label: string }, true> & ITagSelectProps) {
  const options = props.tags.map(tag => ({
    value: tag, label: tag
  }));

  return <Select isMulti {...props} closeMenuOnSelect={false} options={options} className={(props.className) ? `${style.dropdown} ${props.className}` : style.dropdown} />
}