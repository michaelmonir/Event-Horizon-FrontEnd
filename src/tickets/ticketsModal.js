import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "30px"

};

export default function TicketsModal({tickets}) {
    const [ticketsNumber, setTicketsNumber] = React.useState(Array(tickets.length).fill(0))
    const [ticketsPrice, setTicketsPrice] = React.useState(Array(tickets.length).fill(0))

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true)
        setTicketsNumber(Array(tickets.length).fill(0))
        setTicketsPrice(Array(tickets.length).fill(0))
    };
    const handleClose = () => {
        setOpen(false)
        setTicketsNumber(Array(tickets.length).fill(0))
        setTicketsPrice(Array(tickets.length).fill(0))
    };

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <Button onClick={handleOpen}
                    variant="contained"
                    style={
                        {
                            position: "absolute",
                            top: "20px",
                            right: "40px",
                        }
                    }
            >Buy tickets</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Buy tickets
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <form onSubmit={handleSubmit} className={"ticket-form"}>
                            <div className="ticket-modal-body">
                                {
                                    tickets.map((ticket, index) => {
                                            return <div className="buy-row">
                                                <div className="ticket-name"> {ticket.name} </div>
                                                <TextField id="outlined-basic" label="Number of tickets" variant="outlined"
                                                           type={"number"} onChange={(e) => {
                                                    if (e.target.value < 0) e.target.value = 0
                                                    let newTicketsNumber = ticketsNumber
                                                    newTicketsNumber[index] = e.target.value
                                                    setTicketsNumber(newTicketsNumber)
                                                    let newTicketsPrice = ticketsPrice
                                                    newTicketsPrice[index] = e.target.value * ticket.price
                                                    setTicketsPrice(newTicketsPrice)
                                                }}/>
                                                <div className="ticket-price"> {ticket.price} $</div>
                                            </div>
                                        }
                                    )
                                }
                                <Button variant="contained" type={"submit"}>Buy The Ticket</Button>
                            </div>

                        </form>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}