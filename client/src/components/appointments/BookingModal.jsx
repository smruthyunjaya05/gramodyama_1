import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import './BookingModal.css'; // Add this stylesheet for custom styling

const BookingModal = ({ open, onClose, officer, selectedDate }) => {
    const [selectedTime, setSelectedTime] = useState('');

    const handleBooking = () => {
        // Here you would implement the API call to save the booking
        const bookingData = {
            officerId: officer.id,
            date: selectedDate,
            time: selectedTime,
        };
        console.log('Booking:', bookingData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} className="booking-modal">
            <DialogTitle>ಭೇಟಿ ಕಾದಿರಿಸಿ</DialogTitle>
            <DialogContent>
                <div className="booking-details">
                    <p>ಅಧಿಕಾರಿ: {officer?.name}</p>
                    <p>ದಿನಾಂಕ: {selectedDate?.toLocaleDateString()}</p>
                    <div className="time-slots">
                        <h4>ಲಭ್ಯವಿರುವ ಸಮಯಗಳು:</h4>
                        {officer?.timeSlots.map((time) => (
                            <button
                                key={time}
                                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                                onClick={() => setSelectedTime(time)}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} className="cancel-button">ರದ್ದುಮಾಡಿ</Button>
                <Button 
                    onClick={handleBooking} 
                    disabled={!selectedTime} 
                    variant="contained" 
                    className="confirm-button"
                >
                    ದೃಢೀಕರಿಸಿ
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BookingModal;
