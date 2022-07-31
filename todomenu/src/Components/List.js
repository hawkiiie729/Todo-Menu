import React from 'react'

const List = ({data,props}) => {
  const filteredData = data.filter((el) => {
    //if no input the return the original
    if (props.input === '') {
        return el;
    }
    //return the item which contains the user input
    else {
        return el.text.toLowerCase().includes(props.input)
    }
})
return (
    <>
        {filteredData.map((item) => (
            <li key={item.id}>{item.title}</li>
        ))}
   </>
)
}

export default List