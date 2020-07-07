import React, {useState} from 'react'

function SearchUser(props){
    const [formState, setFormState] = useState('');

    const handleChange = (e)=>{
        setFormState(e.target.value)
    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        props.searchProfile(formState)
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    placeholder='Search Github Username'
                    onChange={handleChange}/>
                <button>Search</button>
            </form>
        </div>
    )
}


export default SearchUser;