import React from 'react';

interface Props {
  value: string;
  handleSearchChange: (val: string) => void;
}

export default function SearchInputComponent(props: Props) {
  const {
    value,
    handleSearchChange,
  } = props;
  return (
    <>
      <input type="text" value={value} list="data" onChange={(event) => handleSearchChange(event.target.value)} />
      <datalist id="data">
        {/* {
          productsName.map((item,index)=>{
            return  <option key={uuid()} value={item.item_name} />;
          })
        } */}
      </datalist>
    </>
  );
}
