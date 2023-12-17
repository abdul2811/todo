import searchImage from '../images/search.png'

const Search = ({handleChange, handleMouseEnter, handleMouseLeave, inlineStyle, handleFocus, handleBlur}) => {
    return (
      <form>
          <div className={inlineStyle} id='search-form' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <label htmlFor='search'><img id='search-img' src={searchImage} /></label>
            <input className={inlineStyle} id='search' onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}  />
          </div>
        </form>
    )
  }

export default Search