import React, { useEffect } from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import TextField from '@material-ui/core/TextField'
import { axiosWithAuth } from '../utils/auth/axiosWithAuth'
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton'
import { Skeleton } from '@material-ui/lab'

const GuestNotes = ({ guest, setIsOpen }) => {
    const [noteValue,setNoteValue] = React.useState('')
    const [loading, setLoading] = React.useState(true)
    const [notes, setNotes] = React.useState([])

    const fetchNotes = async () => {
        setLoading(true)
        try { 
           let res = await axiosWithAuth().get(`/api/v1/guests/${guest.id}/notes`)
           setNotes(res.data.payload.notes)
        } catch (error) {
           alert('error')
           console.log(error) 
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNotes()
        console.log(guest)
    }, [])

    const handleChange = (e) => {
        setNoteValue(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
           let res = await axiosWithAuth().post(`/api/v1/guests/${guest.id}/notes`, {description: noteValue})
           setNotes([...notes, res.data.payload.note])
           setNoteValue('')
        } catch (error) {
           alert('error') 
           console.log(error) 
        }
    }


    if (loading) {
        return (
            <CardShadow>
                <div className='guest-notes-skeleton'>
                    <Skeleton width={900} height={800}/>
                </div>
             </CardShadow>
        );
    }
            
    return (
        <CardShadow onClick={(e) => {
            setIsOpen(false)
        }}>
            <div className="container">
                 <div className="notes-container" onClick={(e) => e.stopPropagation()}>
                     <div className="close-notes">
                         <ArrowBackIcon fontSize='large' onClick={() => setIsOpen(false)}></ArrowBackIcon>
                     </div>
                    <div className="notes-container-inner">
                        <div className="notes">
                            {
                                notes.map(note => {
                                    return <h4 className='note'>{note.description}</h4>
                                })
                            }
                        </div>
                    </div>
                    <div className="add-note-form-container">

                        <form action="" className='add-note-form' onSubmit={handleSubmit}>
                            <TextField value={noteValue} style={{width: '100%'}} onChange={handleChange} multiline rows={4} label='Type anything you want here'>Add notes</TextField>
                            <div onClick={handleSubmit}>  
                                <IconButton size='large'>
                                    <AddIcon />
                                </IconButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </CardShadow>
    )
}

export default GuestNotes

const CardShadow = styled(motion.div)`
	width: 100%;
	min-height: 100vh;
	overflow-y: scroll;
	background: rgba(0,0,0,0.5);
	position: fixed;
	top: 0;
    left: 0;
    z-index: 11;
`