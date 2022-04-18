function Search(props) {
  return (
    <input
      value={props.startingValue}
      onChange={props.onChange}
      placeholder={props.noun ? `🔍 Search ${props.noun}` : '🔍 Search'}
    />
  )
}

export default Search
